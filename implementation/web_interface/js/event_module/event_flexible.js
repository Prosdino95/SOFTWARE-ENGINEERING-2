$(function(){

    var path_jason;

    // setting route
    $("#stage").on("bind_path", function(event, routeData, index){
        path_jason = routeData[index];
    });

    $("#stage").on("unbind_path", function(){
        path_jason = null;
    });


    $("#stage").on('click', '#flexible_event', function(){

        // if flexible flag checked modify DOM
        if( $( "#flexible_event:checked" ).val()){
            changeToFlexibleForm();
        }
        else {
            // restore DOM if uncheck
            returnToSubmitForm();
        }
    });

    // ajax post to submit flexible event button
    $("#stage").on('submit', '#flexible_event_form', function (event) {

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
        var starting_flexible_day = $("#starting_flexible_day").val();
        var ending_flexible_day = $("#ending_flexible_day").val();
        var range_min = $("#range_min").val();
        var range_max = $("#range_max").val();
        var duration_event = $("#duration_event").val();

        // obtain choord of the event
        var starting_location = $("#starting_location").val();
        var meeting_location = $("#meeting_location").val();

        // obtain alarm info
        var alarm_timer = $("#alarm_time").val();
        var alarm_message = $("#alarm_message").val();

        // show loading screen
        showLoading();

        $.ajax({
            url: 'http://127.0.0.1:5000/flexibleLunch',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({
                "token": token, "title": title,
                "starting_flexible_day": starting_flexible_day, "ending_flexible_day": ending_flexible_day,
                "range_min": range_min, "range_max": range_max, "duration_event": duration_event,
                "starting_location": starting_location, "meeting_location": meeting_location,
                "route": path_jason,
                "alarm_timer": alarm_timer, "alarm_message": alarm_message
            }),

            success: function (response) {

                //hide loading
                hideLoading();

                // Show a friendly event_section
                redirectDialog("Flexible lunch submitted correctly.", './travlendar.html');
            },
            error: function (error) {
                errorDialog(error);
            }
        });
    });
});

// switch to flexible form
function changeToFlexibleForm(){

    //delete all element of normal event form and button submit
    $("#button_wrapper_form").empty();
    $("#event_form").attr('id', 'flexible_event_form'); // change id of the form to attach it a new event
    componentHandler.upgradeDom();

    $('#submit_event_table').load('./html/event_section/flexible_form.html', function() {

        $('<button>', {
            class: 'mdl-button mdl-js-button mdl-button mdl-button--raised mdl-js-ripple-effect',
            id: 'cancel_event',
        }).appendTo('#button_wrapper_form');

        $('<button>', {
            class: 'mdl-button mdl-js-button mdl-button--colored mdl-button--raised mdl-js-ripple-effect',
            id: 'submit_flexible_event',
            type: 'submit'
        }).appendTo('#button_wrapper_form');

        $("#cancel_event").text("CANCEL");
        $("#submit_flexible_event").text("SUBMIT");
        componentHandler.upgradeDom();
    });
};

// switch to normal submit form
function returnToSubmitForm(){
    // reload this page and restore it with default DOM
    deleteSubmitEventHeader();
    // delete path
    $("#stage").trigger('unbind_path');
    initSubmitForm();
};