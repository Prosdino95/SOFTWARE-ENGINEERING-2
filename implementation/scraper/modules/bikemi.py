import requests
import re
import codecs
import bs4

marker_re = re.compile('GoogleMap\.addMarker\(\'.*\)')

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
