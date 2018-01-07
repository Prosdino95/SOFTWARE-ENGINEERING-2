import utils
import gpxpy
import gpxpy.gpx
import random

"""
route - class to handle gpx routes
"""
class route:
    def __init__(self, gps_start, gps_end, mode, time, distance, gpx_route):
        self.gps_start = gps_start
        self.gps_end = gps_end
        self.mode = mode
        self.time = time
        self.distance = distance
        self.gpx_route = gpx_route

    """
    merge - merges a route in the current
    other_route - a route to be merged
    before - if true merge the other_route before the current route, otherwise
    merge after the current route
    """
    def merge(self, other_route, before = True):
        if other_route is None:
            return
        self.time = self.time + other_route.time
        self.distance = self.distance + other_route.distance
        if before:
            self.gps_start = other_route.gps_start
            self.gpx = utils.merge_gpx(other_route.gpx_route, self.gpx_route)
        else:
            self.gps_end = other_route.gps_end
            self.gpx = utils.merge_gpx(self.gpx_route, other_route.gpx_route)

    """
    to_json -  converts the current route into the json format used by the
    web app to display the route
    """
    def to_json(self):
        waypoints = self.generate_waypoints()
        xml_waypoints = ''.join(['<wpt lat="{}" lon="{}"></wpt>'.format(
                                    x[0], x[1]) for x in waypoints])
        xml_route = ''.join(['<rtept lat="{}" lon="{}"><name>{}</name></rtept>'.format(
                                x[0], x[1], random.randint(100000000,1000000000))
                             for x in waypoints])
        final_xml = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><gpx version="1.1" creator="optimalroute"><metadata/>' + \
                    xml_waypoints + '<rte>' + xml_route + '</rte></gpx>'
        return {'time': self.time,
                'distance': self.distance,
                'method': self.mode,
                'gpx': final_xml
               }

    def generate_waypoints(self):
        return [(x.latitude, x.longitude) for x in 
                self.gpx_route.points]
