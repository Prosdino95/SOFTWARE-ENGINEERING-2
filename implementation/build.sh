docker build -t travlendar_endpoint -f endpoint.Dockerfile .
docker build -t travlendar_optimalroute -f optimalroute.Dockerfile .
docker build -t travlendar_scraper -f scraper.Dockerfile .
docker build -t travlendar_webinterface -f web_interface.Dockerfile .
cd valhalla_server
docker build -t valhalla_server_milan .
cd ..
