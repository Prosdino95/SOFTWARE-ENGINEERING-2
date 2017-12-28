// global variables
var draggableMap, draggebleFeature;

// init a Draggable map
function newMap() {

    // Drag and Drop Icons Setup
    //------------------------------------------------------------------------//
    var app = {};

    app.Drag = function () {

        ol.interaction.Pointer.call(this, {
            handleDownEvent: app.Drag.prototype.handleDownEvent,
            handleDragEvent: app.Drag.prototype.handleDragEvent,
            handleMoveEvent: app.Drag.prototype.handleMoveEvent,
            handleUpEvent: app.Drag.prototype.handleUpEvent
        });

        this.coordinate_ = null;
        this.cursor_ = 'pointer';
        this.feature_ = null;
        this.previousCursor_ = undefined;

    };
    ol.inherits(app.Drag, ol.interaction.Pointer);

    app.Drag.prototype.handleDownEvent = function (evt) {
        var map = evt.map;

        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature) {
                return feature;
            });

        if (feature) {
            this.coordinate_ = evt.coordinate;
            this.feature_ = feature;
        }

        return !!feature;
    };

    app.Drag.prototype.handleDragEvent = function (evt) {
        var deltaX = evt.coordinate[0] - this.coordinate_[0];
        var deltaY = evt.coordinate[1] - this.coordinate_[1];

        var geometry = this.feature_.getGeometry();
        geometry.translate(deltaX, deltaY);

        this.coordinate_[0] = evt.coordinate[0];
        this.coordinate_[1] = evt.coordinate[1];
    };

    app.Drag.prototype.handleMoveEvent = function (evt) {
        if (this.cursor_) {
            var map = evt.map;
            var feature = map.forEachFeatureAtPixel(evt.pixel,
                function (feature) {
                    return feature;
                });
            var element = evt.map.getTargetElement();
            if (feature) {
                if (element.style.cursor != this.cursor_) {
                    this.previousCursor_ = element.style.cursor;
                    element.style.cursor = this.cursor_;
                }
            } else if (this.previousCursor_ !== undefined) {
                element.style.cursor = this.previousCursor_;
                this.previousCursor_ = undefined;
            }
        }
    };

    app.Drag.prototype.handleUpEvent = function () {
        this.coordinate_ = null;
        this.feature_ = null;
        return false;
    };
    //------------------------------------------------------------------------//

    // Initial View on Milano Duomo
    var view = new ol.View({
        projection: 'EPSG:4326',
        center: [9.1900, 45.4641], //default EPSG:3857: [1023046.9213,5694901.1407]
        zoom: 18
    });

    draggableMap = new ol.Map({
        interactions: ol.interaction.defaults().extend([new app.Drag()]),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: view,
        target: 'map'
    });

    // Setup initial Markers
    var startMarker = createMarker(0);
    var meetingMarker = createMarker(0.0100); //with offset

    startMarker.setStyle(getIconStyle("./res/pin.png"));
    meetingMarker.setStyle(getIconStyle("./res/flag_finish.png"));

    // on change update the textfield
    startMarker.on('change', function () {
        $("#starting_location_textfield")[0].MaterialTextfield.change(startMarker.getGeometry().getCoordinates())
    });
    meetingMarker.on('change', function () {
        $("#meeting_location_textfield")[0].MaterialTextfield.change(meetingMarker.getGeometry().getCoordinates())
    });

    // Geolocate Marker event
    $("#geolocate_starting").on('click', function () {
        geolocateThisMarker(startMarker, view);
    });
    $("#geolocate_meeting").on('click', function () {
        geolocateThisMarker(meetingMarker, view);
    });

    // init the feature
    draggebleFeature = new ol.source.Vector({
        features: [startMarker, meetingMarker]
    });

    // Render of the map
   var markers = new ol.layer.Vector({
        map: draggableMap,
        source: draggebleFeature
    });

    // focus position map on markers position
    var extent = markers.getSource().getExtent();
    draggableMap.getView().fit(extent, draggableMap.getSize());
}

// Geolocate a Marker
function geolocateThisMarker(marker, view) {

    // geolocalization init
    var geolocation = new ol.Geolocation({
        projection: view.getProjection(),
        tracking: true // important!
    });

    // update marker position periodically
    geolocation.on('change:position', function () {
        var coordinates = geolocation.getPosition();
        marker.setGeometry(coordinates ?
            new ol.geom.Point(coordinates) : null);
    });

    // geolocate may have error.
    geolocation.on('error', function (error) {
        errorDialog(error.message);
    });
}

// Setup style marker
function getIconStyle(url) {
    return new ol.style.Style({
        image: new ol.style.Icon(
            ({
                opacity: 0.95,
                src: url
            }))
    })
};

// create drag markers of event position
function createDragMarkers(eventClicked) {

    // coord are saved on Event object as a string: need to parse it!
    var starting_location = fromStringToCoord(eventClicked.starting_location);
    var meeting_location = fromStringToCoord(eventClicked.meeting_location);

    // adding markers
    var startMarker = createFixedMarker(starting_location);
    var meetingMarker = createFixedMarker(meeting_location);

    startMarker.setStyle(getIconStyle('./res/pin.png'));
    meetingMarker.setStyle(getIconStyle('./res/flag_finish.png'));

    // delete old markers
    draggebleFeature.clear();

    // add new markers
    draggebleFeature = new ol.source.Vector({
        features: [startMarker, meetingMarker]
    });

    // update the layers on map
   var markers =  new ol.layer.Vector({
        map: draggableMap,
        source: draggebleFeature
    });

    // focus position map on markers position
    var extent = markers.getSource().getExtent();
    draggableMap.getView().fit(extent, draggableMap.getSize());
}

// create dummy initial marker
function createMarker(offset) {
    return new ol.Feature(new ol.geom.Point([9.1900 + offset, 45.4641 + offset]));
}