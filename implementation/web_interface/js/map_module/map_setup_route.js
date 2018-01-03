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

function loadPath(route, map){
    refreshPath(map);
    var vector = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: new ol.format.GPX().readFeatures(route["path_gpx"]),
            format: new ol.format.GPX()
        }),
        style: function(feature) {
            return styleMyPath()[feature.getGeometry().getType()];
        }
    });

    map.addLayer(vector);
}

// delete path layer
function refreshPath(map){

    var pathLayer = function(a){ return a instanceof ol.layer.Vector};
    var path = map.getLayers().getArray().find(pathLayer);
    map.removeLayer(path);
}
