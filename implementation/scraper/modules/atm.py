import urllib.request as rq
import rethinkdb as r
import tempfile
import re
import os
import shapefile
import utm
import math
import json
import statistics
import itertools
import schedule
import haversine

dataset_url='http://dati.comune.milano.it/dataset/ds66_infogeo_fermate_metropolitana_localizzazione_'
dl_regex=re.compile(r'"http.*?\.7z"')
with open(os.path.join(os.path.dirname(__file__),'atm.json')) as f:
    atm_json = json.load(f)
rt_ip = os.environ.get('RETHINKDB_IP', '127.0.0.1')
rt_port = os.environ.get('RETHINKDB_PORT', '28015')


def get_dl_link():
    dataset_page = rq.urlopen(dataset_url).read()
    dl_url = dl_regex.findall(dataset_page.decode('utf-8'))[0]
    return dl_url.replace('"','')


def dul_dataset(url):
    tmp_dir = tempfile.mkdtemp()
    file_path = os.path.join(tmp_dir, 'atm_dataset.7z')
    with open(file_path, 'wb') as f:
        f.write(rq.urlopen(url).read())
    orig_dir = os.getcwd()
    os.chdir(tmp_dir)
    os.system('7z x atm_dataset.7z')
    os.chdir('66_MM_FERM')
    shp = shapefile.Reader('MM_FERM')
    os.chdir(orig_dir)
    return shp


def station_dict(record):
    raw_latlon = record.shape.points[0]
    latlon = utm.to_latlon(raw_latlon[0],raw_latlon[1],32,'N')
    return {'name': record.record[1],
            'id': [record.record[0]],
            'lines': list(map(int, record.record[2].split(','))),
            'lat': latlon[0],
            'lon': latlon[1]}


def station_dist(station1, station2):
    return haversine.haversine((station1['lat'], station1['lon']),
                               (station2['lat'], station2['lon']))


def mkstationdb(stations):
    for clone_group in atm_json['clone']:
        new_elem_list = []
        for elem in stations[:]:
            if list_overlap(elem['id'], clone_group):
                new_elem_list.append(elem)
                stations.remove(elem)
        if new_elem_list:
            stations.append(merge_stations(new_elem_list))
    final_list = []
    for station in stations:
        station['cardinality'] = 1 if list_overlap(
                                    station['id'],
                                    atm_json['endpoints']) else 2*len(station['lines'])
        station['neighbours'] = []
        station['blacklist'] = []
    for quadpoint in atm_json['forks']:
        for station in stations[:]:
            if quadpoint['center'] in station['id']:
                station['cardinality'] = len(quadpoint['branches'])
                station['neighbours'] = [[x] for x in quadpoint['branches']]
                final_list.append(station)
                stations.remove(station)
                for elem in stations:
                    if list_overlap(elem['id'], quadpoint['branches']):
                        elem['neighbours'].append([quadpoint['center']])
                        elem['blacklist'] = list(set(quadpoint['branches']) -
                                                 set(elem['id']))
                break
    for station in stations:
        if len(station['neighbours']) < station['cardinality']:
            for line in station['lines']:
                candidates = sorted(
                                filter(lambda x: line in x['lines'], stations),
                                key = lambda x: station_dist(station, x))
                candidates.pop(0) #We filter out the station itself
                while True:
                    best_candidate = candidates.pop(0)
                    if not list_overlap(best_candidate['id'], station['blacklist']):
                        break
                station['neighbours'].append(best_candidate['id'])
                if station['cardinality'] > len(station['neighbours']):
                    for candidate in candidates:
                        cand_angle = math.atan2(candidate['lat'] - best_candidate['lat'],
                                                candidate['lon'] - best_candidate['lon'])
                        if abs(cand_angle) > math.pi*0.5 and (not list_overlap(
                            candidate['id'], station['blacklist'])):
                            station['neighbours'].append(candidate['id'])
                            break
        final_list.append(station)
    for station in final_list:
        station.pop('blacklist', None)
    return final_list


def merge_stations(elem_list):
    return {'name': ','.join(map(lambda x: x['name'], elem_list)),
            'id': list(itertools.chain.from_iterable(
                            map(lambda x: x['id'], elem_list)
                      )
                  ),
            'lines': list(
                        itertools.chain.from_iterable(
                            map(lambda x: x['lines'], elem_list)
                        )
                     ),
            'lat': statistics.mean(map(lambda x: x['lat'], elem_list)),
            'lon': statistics.mean(map(lambda x: x['lon'], elem_list))}


def list_overlap(list1, list2):
    return any([x in list2 for x in list1])


def scan():
    r.connect(rt_ip, rt_port).repl()
    dataset = dul_dataset(get_dl_link())
    station_array = list(map(station_dict, dataset.shapeRecords()))
    if "atm_mi" not in r.db_list().run():
        r.db_create("atm_mi").run()
        r.db("atm_mi").table_create("stations", primary_key="id").run()
        r.db("atm_mi").table("stations").insert(mkstationdb(station_array)).run()
    else:
        r.db("atm_mi").table("stations").delete().run()
        r.db("atm_mi").table("stations").insert(mkstationdb(station_array)).run()


def init():
    print("Starting ATM module")
    scan()
    schedule.every(4).weeks.do(scan)
