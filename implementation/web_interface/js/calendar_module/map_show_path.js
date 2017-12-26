var eventRoute;

$(function(){
    $("#stage").on("click", "#map_button", function (event) {
        event.preventDefault();
        $("#stage").load("./html/map.html", function(){
            $("#TITLE").text("Show route path");
            // delete header buttons
            deleteCalendarButtons();
        });
    });
});

// Open Layer script
function showPathMap() {

    var starting_location = fromStringToCoord(eventRoute.starting_location);
    var meeting_location = fromStringToCoord(eventRoute.meeting_location);

    var view = new ol.View({
        center: [0,0],
        zoom: 18
    });

    // Init OpenStreetMap map
    var map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: view,
        target: 'show_path'
    });

    // Setup Markers
    var startMarker = createFixedMarker(starting_location);
    var meetingMarker = createFixedMarker(meeting_location); //with offset

    startMarker.setStyle(getIconStyle('./res/pin.png'));
    meetingMarker.setStyle(getIconStyle('./res/flag_finish.png'));

    // Final render of the map
   var markers =  new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
            features: [startMarker, meetingMarker]
        })
    });

    var extent = markers.getSource().getExtent();
    map.getView().fit(extent, map.getSize());
}

//------------------------------------------------------------------------//
//  --  Functions

// Setup style marker
function getIconStyle(url) {
    return new ol.style.Style({
        image: new ol.style.Icon(
            ({
                opacity: 0.95,
                src: url
            }))
    })
}

// Setup coordinate
function createFixedMarker(location) {
    return new ol.Feature(new ol.geom.Point(location));
}

function passEventRoute(eventClicked){
    eventRoute = eventClicked;
}

function fromStringToCoord(string){
    return string.split(',').map(Number);
}