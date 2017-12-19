// Spawn Dialog
function spawnDialog(text, title) {
    var dialog = document.querySelector('dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    $("#warning_dialog").text(text);
    $("#warning_title").text(title);
    dialog.querySelector('.close').addEventListener('click', function () {
        // redirect navigation
        window.location = "./index.html";
        dialog.close();
    });
}

// go back if cancel is performed
$("#stage").on("click", "#cancel_event", function (event) {
    // redirect navigation
    window.location = "./index.html";
});

//Calculate the color of the event based on its type
function colorfy() {
    var type = $('input[name = type]:checked').val();
    switch (type) {
        case "business":
            return '#FF5252';
        case "free time":
            return '#FFC400';
        case "social":
            return '#00E676';
        default:
            return '#FF5252';
    }
}

// main
$(function () {
    $("#stage").on("submit", "#event_form", function (event) {

        event.preventDefault();

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        // obtaining the json of the event
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

        // Post request to /addEvent
        $.ajax({
            url: 'http://127.0.0.1:5000/addEvent',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({
                "token": token,
                "title": title, "start": start, "end": end,
                "color": color, "editable": editable,
                "starting_location": starting_location, "meeting_location": meeting_location, // Coordinates
                "alarm_timer": alarm_timer, "alarm_message": alarm_message
            }), // Alarm

            success: function (response) {

                // Show a friendly event_section
                spawnDialog("Event submitted correctly.", "");
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});