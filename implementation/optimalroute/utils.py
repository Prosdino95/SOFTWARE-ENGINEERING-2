import gpxpy
import gpxpy.gpx

"""
merge_gpx - utility to merge 2 gpx file together
"""
def merge_gpx(gpx_begin_route, gpx_end_route):
    new_gpx = gpxpy.gpx.GPX()
    gpx_route = gpxpy.gpx.GPXRoute()
    new_gpx.routes.append(gpx_route)
    gpx_route.points.extend(gpx_begin_route.points)
    gpx_route.points.extend(gpx_end_route.points)
    return new_gpx

"""
list_intersection - returns the intersection (e.g. the elements in common in
both lists) of 2 lists. The list returned is guaranteed to not have duplicate
entries
"""
def list_intersection(list1, list2):
    return list(set(list1) & set(list2))
