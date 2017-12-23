#!/usr/bin/env python3

import requests
import flask
import importlib
import plugin_registry
import os
import json

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


"""
handle_request - parses the route request
message format
{
    "gps_begin": [45.4781108, 9.2250824],
    "gps_end": [45.4637344, 9.1888901],
    "allowed_types": ['auto','foot']
}
"""
@app.route('/route', methods = ['POST'])
def handle_request():
    if not flask.request.headers['Content-Type'].startswith('application/json'):
        return '', 404
    req_json = flask.request.get_json()
    route_options = []
    for trans_type in req_json['allowed_types']:
        for router in pr.get_routers_by_category(trans_type):
            route_options.append(router['router'](req_json['gps_begin'],
                                                  req_json['gps_end']))
    return json.dumps(route_options)



if __name__ == '__main__':
    app.run()
