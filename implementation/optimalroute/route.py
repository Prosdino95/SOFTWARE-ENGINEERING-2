import utils
import gpxpy
import gpxpy.gpx

class route:
    def __init__(self, gps_start, gps_end, mode, time, distance, gpx_route):
        self.gps_start = gps_start
        self.gps_end = gps_end
        self.mode = mode
        self.time = time
        self.distance = distance
        self.gpx_route = gpx_route

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

    def to_json(self):
        dummy_gps = gpxpy.gpx.GPX()
        dummy_gps.waypoints = self.generate_waypoints()
        dummy_gps.routes.append(self.gpx_route)
        return {'time': self.time,
                'distance': self.distance,
                'method': self.mode,
                'gpx': dummy_gps.to_xml(version = '1.1')
               }

    def generate_waypoints(self):
        return [gpxpy.gpx.GPXWaypoint(x.latitude, x.longitude) for x in 
                self.gpx_route.points]
