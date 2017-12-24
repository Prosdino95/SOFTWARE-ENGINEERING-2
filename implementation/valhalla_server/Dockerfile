from valhalla_custom

RUN mkdir -p /opt/data
COPY milan_map_full.pbf /opt/data
RUN cd /opt/data && \
    /opt/bin/valhalla_build_config --mjolnir-tile-dir ${PWD}/valhalla_tiles \
        --mjolnir-tile-extract ${PWD}/valhalla_tiles.tar --mjolnir-timezone ${PWD}/valhalla_tiles/timezones.sqlite \
        --mjolnir-admin ${PWD}/valhalla_tiles/admins.sqlite > valhalla.json && \
    /opt/bin/valhalla_build_tiles -c valhalla.json milan_map_full.pbf && \
    find valhalla_tiles | sort -n | tar cf valhalla_tiles.tar --no-recursion -T -

ENTRYPOINT cd /opt/data && \
           /opt/bin/valhalla_route_service valhalla.json 1
