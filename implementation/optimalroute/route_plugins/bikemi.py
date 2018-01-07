import requests
import os
import copy
import gpxpy
import rethinkdb as r
import haversine

pr = None
station_list = []

def init(registry):
    global pr
    global station_list
    pr = registry
    registry.register_plugin('bike_sharing',
                             {'router': find_path,
                              'id': 'bikemi',
                              'desc': 'Bikemi routing'})
    rt_ip = os.environ.get('RETHINKDB_IP', '127.0.0.1')
    rt_port = os.environ.get('RETHINKDB_PORT', '28015')
    r.connect(rt_ip, rt_port).repl()
    station_list = list(r.db('atm_mi').table('bikemi').run().items)
    print('Registered bikemi bike sharing plugin')

def find_closest(coordinate):
    return sorted(station_list,
                  key = lambda x: haversine.haversine((x['latitude'], 
                                                       x['longitude']),
                                                      (coordinate[0],
                                                       coordinate[1])
                                                     )
                 )[0]


def find_path(coord_begin, coord_end):
    begin_station = find_closest(coord_begin)
    end_station = find_closest(coord_end)
    path = pr.get_routers_by_category('bike')[0]['router']((begin_station['latitude'],
                                                            begin_station['longitude']),
                                                           (end_station['latitude'],
                                                            end_station['longitude']))
    path.mode = 'bike_sharing'
    return path