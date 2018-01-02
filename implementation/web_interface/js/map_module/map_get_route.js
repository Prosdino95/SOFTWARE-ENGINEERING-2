$(function(){

    $("#stage").on('click', "#get_path", function(event){

        event.preventDefault();
        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        // obtain choord of the event
        var string_starting_location = $("#starting_location").val();
        var string_meeting_location = $("#meeting_location").val();

        // throw error if undefined
        if(!string_starting_location || !string_meeting_location){
            errorDialog("Please setup starting point and meeting point first.");
            throw(error);
        }

        // parse to int
        var starting_location = fromStringToCoord(string_starting_location);
        var meeting_location = fromStringToCoord(string_meeting_location);

        // ajax post
        $.ajax({
                url: 'http://127.0.0.1:5000/getRoute',
                dataType: 'text',
                contentType: "application/json; charset=utf-8",
                type: 'post',
                data: JSON.stringify({
                    "token": token,
                    "gps_start": starting_location.reverse(),
                    "gps_stop": meeting_location.reverse()
                }),
            success: function (gpx_response) {

                console.log(gpx_response);
                var route = JSON.parse(gpx_response);
                var data = route[0];

                var style = {
                    'Point': new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: 'rgba(255,255,0,0.4)'
                            }),
                            radius: 5,
                            stroke: new ol.style.Stroke({
                                color: '#ff0',
                                width: 1
                            })
                        })
                    }),
                    'LineString': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#f00',
                            width: 3
                        })
                    }),
                    'MultiLineString': new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#0f0',
                            width: 3
                        })
                    })
                };

                var vector = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: new ol.format.GPX().readFeatures(data["path_gpx"]),
                        format: new ol.format.GPX()
                    }),
                    style: function(feature) {
                        return style[feature.getGeometry().getType()];
                    }
                });

                draggableMap.addLayer(vector);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});