$(function () {
    $("#stage").on("calendar_load", function (event) {
        $("document").ready(function () {
            event.preventDefault();
            //  var initialLocaleCode = 'en'; NOT IMPLEMENTED
            componentHandler.upgradeDom();

            //get token from cookie
            Cookies.json = true;  // important
            var token = Cookies.get("session_token");

            //init free flag
            free();

            $("#full-calendar").fullCalendar({

                // title
                header: {
                    left: '',
                    center: 'title',
                    right: ''
                },
                // empty footer
                footer: {
                    left: '',
                    center: '',
                    right: ''
                },

                //  locale: initialLocaleCode, NOT IMPLEMENTED
                allDaySlot: false,
                nowIndicator: true,
                locale: 'en',
                businessHours: true,
                editable: true, //important

                events: 'http://127.0.0.1:5000/getEvent?token=' + token, // json Feed

                // click on event function
                eventClick: function (eventClicked) {
                    if(button_timer) {
                        spawnButtons(eventClicked);
                        // start timing
                        setTimeout(function () {
                            deleteButtons();
                        }, 2000);
                    }
                },

                // event light modify
                eventDrop: function(eventDropped, delta, revertFunc){
                    modifyLight(eventDropped, revertFunc);
                    },

                // event light modify
                eventResize: function(eventResized, delta, revertFunc){
                    modifyLight(eventResized, revertFunc);
                },

                //change day when clicking
                dayClick: function(date, jsEvent, view){
                    $("#full-calendar").fullCalendar("changeView", "agendaDay", date);
                }
            });

            // add prev and next button
            addingHeaderButtons();
            setControlButton();

            // NOT IMPLEMENTED
            /* ALL LOCALE SUPPORT
            $.each($.fullCalendar.locales, function (localeCode) {
                $('#locale-selector').append(
                    $('<option/>')
                        .attr('value', localeCode)
                        .prop('selected', localeCode == initialLocaleCode)
                        .text(localeCode)
                );
            });

            // when the selected option changes, dynamically change the calendar option
            $('#locale-selector').on('change', function () {
                if (this.value) {
                    $('#full-calendar').fullCalendar('option', 'locale', this.value);
                }
            });
            */
        });
    });
});