// global variables
var eventRoute;
var map, feature;

// Static map for Show Path view and Map page
function showPathMap() {

    // Initial View on Milano Duomo
    var view = new ol.View({
        projection: 'EPSG:4326',
        center: [9.1900, 45.4641], //default EPSG:3857: [1023046.9213,5694901.1407]
        zoom: 10
    });

    // Init OpenStreetMap map
    map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: view,
        target: 'show_path'
    });

    // if new event to show, update the map
    if(eventRoute){
        addEventPositionMarker();
        addEventRoute();
        $("#stage").trigger('arrange_route', [ eventRoute ]);
    }
}

function addEventRoute(){
    loadPath(eventRoute.route, map);
}

function addEventPositionMarker(){

    // coord are saved on Event object as a string: need to parse it!
    var starting_location = fromStringToCoord(eventRoute.starting_location);
    var meeting_location = fromStringToCoord(eventRoute.meeting_location);

    // adding markers
    var startMarker = createFixedMarker(starting_location);
    var meetingMarker = createFixedMarker(meeting_location);

    startMarker.setStyle(getIconStyle('./res/pin.png'));
    meetingMarker.setStyle(getIconStyle('./res/flag_finish.png'));

    // refresh map for older markers
    deleteMarkers();

    // add new markers
    feature = new ol.source.Vector({
        features: [startMarker, meetingMarker]
    });

    // update the layers on map
    var markers =  new ol.layer.Vector({
        map: map,
        source: feature
    });

    // focus position map on markers position
    var extent = markers.getSource().getExtent();
    map.getView().fit(extent, map.getSize());
}

// Setup coordinate
function createFixedMarker(location) {
    return new ol.Feature(new ol.geom.Point(location));
}

// bind an event to show
function passEventRoute(eventClicked){
    eventRoute = eventClicked;
}

// parse string to get the coords
function fromStringToCoord(string){
    return string.split(',').map(Number);
}

function deleteMarkers(){
    if(feature) {
        feature.clear();
    }
}