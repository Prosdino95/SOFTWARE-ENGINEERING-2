var modifiedEvent;

$(function() {

    $("#stage").on("click", "#modify_button", function () {

        $("#stage").load("./html/event_section/event_modify.html", function(){
            componentHandler.upgradeDom();

            // update html textfield value
            console.log(modifiedEvent.start);
            console.log(modifiedEvent.end);

            $("#event_title_textfield")[0].MaterialTextfield.change(modifiedEvent.title);
            $("#start_day_textfield")[0].MaterialTextfield.change((modifiedEvent.start).format("YYYY-MM-DD"));
            $("#start_time_textfield")[0].MaterialTextfield.change(moment(modifiedEvent.start,"H-mm"));

            if(modifiedEvent.end){
                $("#end_day_textfield")[0].MaterialTextfield.change((modifiedEvent.end).format("YYYY-MM-DD"));
                $("#end_time_textfield")[0].MaterialTextfield.change(moment(modifiedEvent.end, "H-mm"));

            }else {
                $("#end_day_textfield")[0].MaterialTextfield.change((modifiedEvent.start).format("YYYY-MM-DD"));
                $("#end_time_textfield")[0].MaterialTextfield.change(moment(modifiedEvent.start,"H-mm"));
            }

            (modifiedEvent.editable) ? document.querySelector('#flexible_event_checkbox').MaterialCheckbox.check() :
                document.querySelector('#flexible_event_checkbox').MaterialCheckbox.uncheck();

            // coordinates
            $("#starting_location_textfield")[0].MaterialTextfield.change(modifiedEvent.starting_location);
            $("#meeting_location_textfield")[0].MaterialTextfield.change(modifiedEvent.meeting_location);

            //alarm
            $("#alarm_time_textfield")[0].MaterialTextfield.change(modifiedEvent.alarm_timer);
            $("#alarm_message_textfield")[0].MaterialTextfield.change(modifiedEvent.alarm_message);

        });

    });

    $("#stage").on('click', '#cancel_modify', function(){
        redirectDialog("Changes to were not submitted.", './index.html');
    });

    $("#stage").on("submit", "#event_modify_form", function (event) {
        event.preventDefault();

        var title = $("#event_title").val();
        var starting_time = $("#start_time").val();
        var ending_time = $("#end_time").val();
        var start = $("#start_day").val() + " " + (starting_time ? starting_time : "0:00");
        var end = $("#end_day").val() + " " + (ending_time ? ending_time : "0:00");
        var color = colorfy();
        var editable = $('input[id = flexible_event]').prop("checked");

        // obtain choord of the event
        var starting_location = $("#starting_location").val();
        var meeting_location = $("#meeting_location").val();

        // obtain alarm info
        var alarm_timer = $("#alarm_time").val();
        var alarm_message = $("#alarm_message").val();

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        // Post request to /addEvent
        $.ajax({
            url: 'http://127.0.0.1:5000/modEvent',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({
                "token": token, "id": modifiedEvent.id,
                "title": title, "start": start, "end": end,
                "color": color, "editable": editable,
                "starting_location": starting_location, "meeting_location": meeting_location, // Coordinates
                "alarm_timer": alarm_timer, "alarm_message": alarm_message
            }), // Alarm

            success: function (response) {

                // Show a friendly event_section
                redirectDialog("Event modified correctly.", './index.html');
            },
            error: function (error) {
                errorDialog(error);
            }
        });
    });
});

function passModifyID(eventClicked){
    modifiedEvent = eventClicked
}