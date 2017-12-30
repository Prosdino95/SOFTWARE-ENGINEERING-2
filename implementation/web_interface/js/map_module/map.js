// full calendar on right drawer
$(function () {

    $("#stage").on("map_load", function (event) {

        $("#TITLE").text("Map");
        $("#stage").load("./html/map.html", function () {
            // refresh the map
            passEventRoute(null);

            // load the headers
            loadMapHeader();

            // cookie for the jason feed
            Cookies.json = true;  // important
            var token = Cookies.get("session_token");

            //init free flag
            free();

            // init full calendar on right drawer
            $("#map_calendar").fullCalendar({

                // empty title
                header: {
                    left: '',
                    center: '',
                    right: ''
                },

                // empty footer
                footer: {
                    left: '',
                    center: '',
                    right: ''
                },

                height: "parent", //important
                allDaySlot: false,
                locale: 'en',
                editable: true,
                businessHours: true,
                defaultView: "listMonth",
                events: 'http://127.0.0.1:5000/getEvent?token=' + token, // json Feed

                // click on event and update the map
                eventClick: function (eventClicked) {

                    if (button_timer) {
                        // update the map
                        passEventRoute(eventClicked);
                        addEventPositionMarker();


                        spawnButtons(eventClicked, null);
                        // start timing
                        setTimeout(function () {
                            deleteButtons();
                        }, 2000);
                    }
                }
            });
        });
    });
});