$(function () {
    $("#stage").on("calendar_load", function (event) {

        $("document").ready(function () {
            event.preventDefault();
            var initialLocaleCode = 'en';
            componentHandler.upgradeDom();

            //get token from cookie
            Cookies.json = true;  // important
            var token = Cookies.get("session_token");

            $("#full-calendar").fullCalendar({

                header: {
                    left: '',
                    center: 'title',
                    right: ''
                },
                footer: {
                    left: 'prev,next today',
                    center: '',
                    right: 'month,agendaWeek,agendaDay, listMonth'

                },
                locale: initialLocaleCode,
                weekNumbers: true,
                nowIndicator: true,
                navLinks: true,

                businessHours: true,
                events: 'http://127.0.0.1:5000/getEvent?token=' + token
            });

            // build the locale selector's options
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
        });
    });
});