// Open Layer script
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

    // Initial View on Cheers Pub
    var view = new ol.View({
        center: [1026971, 5698803],
        zoom: 18
    });

    // Init OpenStreetMap map
    var map = new ol.Map({
        interactions: ol.interaction.defaults().extend([new app.Drag()]),
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: view,
        target: 'map'
    });

    // Setup Markers
    var startMarker = createMarker(0);
    var meetingMarker = createMarker(20); //with offset

    startMarker.setStyle(getIconStyle());
    meetingMarker.setStyle(getIconStyle());

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

    // Final render of the map
    new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
            features: [startMarker, meetingMarker]
        })
    });
}

//------------------------------------------------------------------------//
//  --  Functions

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
function getIconStyle() {
    return new ol.style.Style({
        image: new ol.style.Icon(
            ({
                opacity: 0.95,
                src: './res/icon1.png'
            }))
    })
}

// Setup coordinate
function createMarker(offset) {
    return new ol.Feature(new ol.geom.Point([1026971 + offset, 5698803 + offset]));
}