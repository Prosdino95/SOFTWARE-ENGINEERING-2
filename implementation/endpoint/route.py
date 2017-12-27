import requests
from tokenDB import token_query
import rethinkdb as r
import rt_server as rts
import os


url = 'http://{}:{}/route'.format(os.environ.get('OPTIMALROUTE_IP', '127.0.0.1'),
                                  os.environ.get('OPTIMALROUTE_PORT', 6000))


def get_route(token, gps_start, gps_stop):
    r.connect(rts.ip, rts.port, "Travlendar").repl()
    email = token_query(token)
    prefs = r.table("user").get(email).get_field('preference').run()
    trans_list = [elem[0] for elem in prefs.items() if elem[1]]
    req_dict = {'gps_begin': gps_start,
                'gps_end': gps_stop,
                'allowed_types': trans_list}
    req = requests.post(url, json=req_dict)
    if req.status_code == 200:
        return req.text
    else:
        return None
