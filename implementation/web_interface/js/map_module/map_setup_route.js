/**
 * @module map_module/map_setup_route
 * @description setup the path openlayer object
 */

/**
 * @external "Open Layers"
 * @see {@link http://openlayers.org/en/latest/apidoc/}
 */

/**
 * init the style to apply on route
 * @return {{LineString: ol.style.Style, MultiLineString: ol.style.Style}}
 */
function styleMyPath(){
    return {
      /*  'Point': new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: '#E8EAF6'
                }),
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: '#1A237E',
                    width: 1
                })
            })
        }),*/
        'LineString': new ol.style.Style({

            stroke: new ol.style.Stroke({
                color: '#FF4081',
                width: 5
            })
        }),
        'MultiLineString': new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#3F51B5',
                width: 3
            })
        })
    };
}

/**
 * Put a gpx route on a OSM map
 * @param route - gpx route
 * @param map - OSM map
 */
function loadPath(route, map){
    refreshPath(map);
    var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: new ol.format.GPX().readFeatures(route["gpx"]),
            format: new ol.format.GPX()
        }),
        style: function(feature) {
            return styleMyPath()[feature.getGeometry().getType()];
        }
    });

    map.addLayer(vector);
}

/**
 * delete the path layer on the OSM map passed
 * @param map
 */
function refreshPath(map){

    var pathLayer = function(a){ return a instanceof ol.layer.Vector};
    var path = map.getLayers().getArray().find(pathLayer);
    map.removeLayer(path);
}