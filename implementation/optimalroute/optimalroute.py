#!/usr/bin/env python3

import requests
import flask
import importlib
import plugin_registry
import os
import json
import utils
import haversine
import copy
import itertools

app = flask.Flask(__name__)

pr = plugin_registry.plugin_registry()


def init():
    plugin_path = os.path.join(os.getcwd(), 'route_plugins')
    route_plugins = filter(lambda x: x.endswith('.py'),
                           os.listdir(plugin_path))
    for plugin in route_plugins:
        module = importlib.import_module('route_plugins.{}'.format(plugin[:-3]))
        module.init(pr)

init()


def get_distance_types(distance):
    if distance <= 0.5:
        return ['foot','bike','bike_sharing']
    elif 0.5 < distance <= 10:
        return ['foot','bike','bike_sharing', 'public_transport',
                'car_sharing','train', 'car']
    elif 10 < distance <= 20:
        return ['car', 'public_transport', 'train']
    elif 20 < distance <= 100:
        return ['car', 'train']
    else:
        return ['airplane', 'car', 'train']

def compute_route(gps_start, gps_end, allowed_types, depth = 0):
    if depth == 3: #We limit the depth to 3 to avoid too long response times
        return [pr.get_routers_by_category('foot')[0]['router'](gps_start, gps_end)]
    distance = haversine.haversine(gps_start, gps_end)
    distance_types = get_distance_types(distance)
    types = utils.list_intersection(distance_types, allowed_types)
    routes = []
    for trans_type in types:
        for router in pr.get_routers_by_category(trans_type):
            route = router['router'](gps_start, gps_end)
            lroutes = [None]
            rroutes = [None]
            if route.gps_start != gps_start:
                lroutes = compute_route(gps_start, route.gps_start,
                                        allowed_types, depth+1)
            if route.gps_end != gps_end:
                rroutes = compute_route(route.gps_end, gps_end,
                                       allowed_types, depth+1)
            for route_combination in itertools.product(lroutes, rroutes):
                new_route = copy.deepcopy(route)
                new_route.merge(route_combination[0], before = True)
                new_route.merge(route_combination[1], before = False)
                routes.append(new_route)
    if depth > 0:
        return sorted(routes, key = lambda x: x.time)[:5]
    else:
        final_list = []
        used_route_modes = []
        for route in sorted(routes, key = lambda x: x.time):
            if not route.mode in used_route_modes:
                final_list.append(route)
                used_route_modes.append(route.mode)
        return final_list[:5]



@app.route('/route', methods = ['POST'])
def handle_request():
    if not flask.request.headers['Content-Type'].startswith('application/json'):
        return '', 404
    req_json = flask.request.get_json()
    routes = compute_route(req_json['gps_begin'], req_json['gps_end'],
                           req_json['allowed_types'])
    json_routes = []
    for route in routes:
        json_routes.append(route.to_json())
    return json.dumps(json_routes)



if __name__ == '__main__':
    app.run()
