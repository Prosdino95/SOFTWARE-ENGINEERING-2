import requests
import re
import codecs
import bs4
import schedule
import rethinkdb as r
import os

marker_re = re.compile('GoogleMap\.addMarker\(\'.*\)')
rt_ip = os.environ.get('RETHINKDB_IP','127.0.0.1')
rt_port = os.environ.get('RETHINK_PORT', 28015)


def get_bike_data():
    web_page = requests.get('http://www.bikemi.com/it/mappa-stazioni.aspx').content
    marker_list = marker_re.findall(web_page.decode('utf-8'))

    bike_data = []
    for marker in marker_list:
        new_marker = codecs.decode(marker, 'unicode-escape')
        marker_split = new_marker.split(',')
        popup_parsed = bs4.BeautifulSoup(new_marker.split(',', 5)[-1],
                                         'html.parser')
        pu_rows = popup_parsed.find_all('tr')
        total_bikes = (int(pu_rows[1].find_all('td')[-2].get_text()) +
                       int(pu_rows[2].find_all('td')[-2].get_text()))
        bike_data.append({'name': marker_split[3].replace("'",'').strip(),
                          'latitude': float(marker_split[1]),
                          'longitude': float(marker_split[2]),
                          'total_bikes': total_bikes})
    return bike_data

def upload_data():
    data = get_bike_data()
    r.db('atm_mi').table('bikemi').delete().run()
    r.db('atm_mi').table('bikemi').insert(data).run()


def init():
    r.connect(rt_ip, rt_port).repl()
    if "atm_mi" not in r.db_list().run():
        r.db_create("atm_mi").run()
    if "bikemi" not in r.db('atm_mi').table_list().run():
        r.db("atm_mi").table_create("bikemi", primary_key="name").run()
    upload_data()
    schedule.every().hour.do(upload_data)
