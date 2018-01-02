$(function(){

    $("#stage").on('click', "#get_path", function(){

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        // obtain choord of the event
        var string_starting_location = $("#starting_location").val();
        var string_meeting_location = $("#meeting_location").val();

        // throw error if undefined
        if(!string_starting_location || !string_meeting_location){
            errorDialog("Please setup starting point and meeting point first.");
            throw(error);
        }

        // parse to int
        var starting_location = fromStringToCoord(string_starting_location);
        var meeting_location = fromStringToCoord(string_meeting_location);

        // ajax post
        $.ajax({
                url: 'http://127.0.0.1:5000/getRoute',
                dataType: 'text',
                contentType: "application/json; charset=utf-8",
                type: 'post',
                data: JSON.stringify({
                    "token": token,
                    "gps_start": starting_location.reverse(),
                    "gps_stop": meeting_location.reverse()
                }),
                success: function (gpx_response) {
                    console.log(gpx_response);
                },
                error: function (error) {
                    console.log(error);
                }
        });
    });
});
