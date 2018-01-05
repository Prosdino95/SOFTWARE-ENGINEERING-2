/**
 * @module map_module/map_get_route
 * @description get path from ajax post
 * @fires ajax post
 * @fires event_choose_route
 */

$(function(){

    $("#stage").on('click', "#get_path", function(event){

        event.preventDefault();
        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        // obtain choord of the event
        var string_starting_location = $("#starting_location").val();
        var string_meeting_location = $("#meeting_location").val();

        // throw error if undefined
        if(!string_starting_location || !string_meeting_location){
            errorDialog("Please setup starting point and meeting point first.");
            throw("Please setup starting point and meeting point first.");
        }

        // parse to int
        var starting_location = fromStringToCoord(string_starting_location);
        var meeting_location = fromStringToCoord(string_meeting_location);

        // show loading screen
        showLoading();

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

                hideLoading();
                var route = JSON.parse(gpx_response);
                $("#stage").trigger('event_choose_route', [ route ]);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});