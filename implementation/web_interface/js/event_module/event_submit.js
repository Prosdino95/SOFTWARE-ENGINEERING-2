/**
 * @module event_module/event_submit
 * @description handles submit of events.
 * @fires ajax post
 */

/**
 * calculates the color string to apply to the event submitted
 * @return {string}
 */

//Calculate the color of the event based on its type
function colorfy() {
    var type = $('input[name = type]:checked').val();
    switch (type) {
        case "business":
            return '#3F51B5';
        case "free time":
            return '#5C6BC0';
        case "social":
            return '#7986CB';
        default:
            return '#3F51B5'; //
    }
}


// main
$(function () {

    /**
     * route path binded with the click of get path button
     */
    var path_jason;

    // load submit event page
    $("#stage").on("click", "#add_event", function (event) {
        event.preventDefault();
        initSubmitForm();
    });

    $("#stage").on("click", "#cancel_event", function(event){
        event.preventDefault();

        $("#stage").trigger('unbind_path');
        // delete geolocation of markers
        draggebleFeature.clear();
        redirectDialog("Event not submitted.", './travlendar.html');
    });

    // setting route
    $("#stage").on("bind_path", function(event, routeData, index){
        path_jason = routeData[index];
    });

    $("#stage").on("unbind_path", function(){
        path_jason = null;
    });

    /**
     * @external ".submit()"
     * @see {@link http://api.jquery.com/submit/}
     */

    $("#stage").on("submit", "#event_form", function (event) {

        event.preventDefault();
        // check if jason path is binded
        if(path_jason == null){
            errorDialog("Please select a route before submitting!");
            throw error;
        };

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        // obtaining the json of the event
        var title = $("#event_title").val();
        var starting_time = $("#start_time").val();
        var ending_time = $("#end_time").val();
        var start = $("#start_day").val() + " " + (starting_time ? starting_time : "00:00") + "+00:00";
        var end = $("#end_day").val() + " " + (ending_time ? ending_time : "00:00") + "+00:00";
        var color = colorfy();

        // obtain choord of the event
        var starting_location = $("#starting_location").val();
        var meeting_location = $("#meeting_location").val();

        // obtain alarm info
        var alarm_timer = $("#alarm_time").val();
        var alarm_message = $("#alarm_message").val();

        // show loading screen
        showLoading();

        // Post request to /addEvent
        $.ajax({
            url: 'http://127.0.0.1:5000/addEvent',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({
                "token": token,
                "title": title, "start": start, "end": end,
                "color": color,
                "starting_location": starting_location, "meeting_location": meeting_location, // Coordinates
                "route": path_jason,
                "alarm_timer": alarm_timer, "alarm_message": alarm_message
            }), // Alarm

            success: function (response) {

                //hide loading
                hideLoading();

                // Show a friendly event_section
                redirectDialog("Event submitted correctly.", './travlendar.html');
            },
            error: function (error) {
                errorDialog(error);
            }
        });
    });
});

/**
 * @external ".load()"
 * @see {@link http://api.jquery.com/load/}
 */

/**
 * restore the submit form and refresh the modified
 */
    function initSubmitForm(){
        $("#stage").load("./html/event_section/event_submit.html", function(){

            $("#TITLE").text("Submit a new event");
            deleteCalendarButtons();
            loadSubmitEventHeader();
            deleteMapHeader();

            $('<button>', {
                class: 'mdl-button mdl-js-button mdl-button mdl-button--raised mdl-js-ripple-effect',
                id: 'cancel_event',
            }).appendTo('#button_wrapper_form');

            $('<button>', {
                class: 'mdl-button mdl-js-button mdl-button--colored mdl-button--raised mdl-js-ripple-effect',
                id: 'submit_event',
                type: 'submit'
            }).appendTo('#button_wrapper_form');

            $("#cancel_event").text("CANCEL");
            $("#submit_event").text("SUBMIT");

            componentHandler.upgradeDom();
        });
    }