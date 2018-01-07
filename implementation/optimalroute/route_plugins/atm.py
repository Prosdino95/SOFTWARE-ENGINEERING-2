import os
import copy
import gpxpy
import rethinkdb as r
import haversine
import time

pr = None
station_list = None
station_dict = None

def init(registry):
    global pr
    global station_list
    global station_dict
    pr = registry
    rt_ip = os.environ.get('RETHINKDB_IP', '127.0.0.1')
    rt_port = os.environ.get('RETHINKDB_PORT', '28015')
    r.connect(rt_ip, rt_port, timeout = 10000).repl()
    #registry.register_plugin('public_transport',
    #                         {'router': find_path,
    #                          'id': 'atmmi_metro',
    #                          'desc': 'ATM MI Metro Routing'})
    while not ('atm_mi' in r.db_list().run()):
        time.sleep(0.5)
    while not ('stations' in r.db('atm_mi').table_list().run()):
        time.sleep(0.5)
    time.sleep(5)
    station_list = list(r.db('atm_mi').table('stations').run().items)
    station_dict = mk_station_dict(station_list)
    #print('Registered ATM Milan Metro Routing plugin')


def mk_station_dict(sl):
    sd = {}
    for station in sl:
        for sid in station['id']:
            sd[sid] = station
    return sd



"""
find_path - find path via the the valhalla server
returns a gpx with the route specified

Parameters:
coord_begin - tuple (latitude, longitude)
coord_end - tuple (latitude, longitude)
"""
def find_path(coord_begin, coord_end):
    begin_station = find_nearest_station(coord_begin)
    end_station = find_nearest_station(coord_end)
    station_list = station_path(begin_station, end_station)


def find_nearest_station(coordinate):
    return sorted(station_list,
                  key=lambda x: haversine.haversine(coordinate, (x['lat'],
                                                                 x['lon'])
                                                   )
                 )[0]


def station_path(s_begin, s_end):
    graph = {'cost': {s_begin['id'][0]: 0}, 'prev': {},
             'intersections': [s_begin['id'][0]]}
    explored_lines = []
    while graph['intersections']:
        print(graph)
        inter_id = graph['intersections'].pop(0)
        if list_difference(station_dict[inter_id], explored_lines):
            inter_cost = graph['cost'][inter_id]
            lines = list_difference(station_dict[inter_id], explored_lines)
            new_graphs = []
            for line in lines:
                new_graphs.append(station_path_line(s_begin['id'][0], line,
                                                    graph['cost'][s_begin['id'][0]]))
            for new_graph in new_graphs:
                graph = merge_graph(graph, new_graph)
    return graph


def station_path_line(s_begin, line, begin_cost = 0):
    station_cost = {s_begin: begin_cost}
    station_prev = {}
    intersections = []
    root = s_begin
    neighbours = {s_begin: station_dict[s_begin]['neighbours']}
    while neighbours:
        new_neighbours = {}
        for root, neighs in neighbours.items():
            for neigh in neighs:
                station_cost[neigh[0]] = station_cost[root] + 1
                station_prev[neigh[0]] = root
                new_neigh = station_dict[neigh[0]]['neighbours']
                new_neighbours[neigh[0]] = []
                for nn in new_neigh:
                    if line in station_dict[nn[0]]['lines'] and nn[0] not in station_cost.keys():
                        new_neighbours[neigh[0]].append(nn[0])
                new_neighbours[neigh[0]] = new_neigh
                if list_difference(station_dict[neigh[0]]['lines'], [line]):
                    intersections.append(neigh[0])
        neighbours = new_neighbours
    return {'cost': station_cost,
            'prev': station_prev,
            'intersections': intersections}

def merge_graph(graph1, graph2):
    new_graph = {}
    new_graph.update(graph1)
    for sid in graph2['cost'].keys():
        if (not sid in new_graph['cost']) or graph2['cost'][sid] < new_graph['cost'][sid]:
            new_graph['cost'][sid] = graph2['cost'][sid]
            new_graph['prev'][sid] = graph2['prev'][sid]
    intersections1 = list_difference(graph1['intersections'],
                                     graph2['cost'].keys())
    intersections2 = list_difference(graph2['intersections'],
                                     graph1['cost'].keys())
    new_graph['intersections'] = intersections1 + intersections2
    return new_graph


def list_intersection(list1, list2):
    return list(set(list1) & set(list))

def list_difference(list_base, list_remove):
    return list(set(list_base) - set(list_remove))
