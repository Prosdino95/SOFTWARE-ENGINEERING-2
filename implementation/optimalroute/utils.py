import gpxpy
import gpxpy.gpx

def merge_gpx(gpx_begin_route, gpx_end_route):
    new_gpx = gpxpy.gpx.GPX()
    gpx_route = gpxpy.gpx.GPXRoute()
    new_gpx.routes.append(gpx_route)
    gpx_route.points.extend(gpx_begin_route.points)
    gpx_route.points.extend(gpx_end_route.points)
    return new_gpx

def list_intersection(list1, list2):
    return list(set(list1) & set(list2))
