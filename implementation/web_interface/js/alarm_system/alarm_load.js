$(function(){

    //get token from cookie
    Cookies.json = true;  // important
    var token = Cookies.get("session_token");

    $.ajax({
        url: 'http://127.0.0.1:5000/getEvent?token=' + token,
        success: function (response) {

            var event_list = response.filter(function (event) {

                var alarm_offset = moment.duration(event.alarm_timer);
                var today = moment().utc("00:00").format("YYYY-MM-DD");

                /* DEBUG
                console.log("E' " + moment.utc(event.start).format("HH:mm") + " con offset: " + alarm_offset.humanize() +
                 " dopo di " + moment().format("HH:mm" + "?"));
                console.log("check dopo questa ora?: " + moment.utc(event.start).subtract(alarm_offset).isAfter(moment().utc("00:00")));
                console.log("e' di oggi?: " + moment(event.start, "YYYY-MM-DD").isSame(moment().format("YYYY-MM-DD")));
                console.log("e' della mezzanotte?: " + moment.utc(event.start).subtract(alarm_offset).format("YYYY-MM-DD"));
                console.log("e' della mezzanotte?: " + moment(today).isSame(
                            moment.utc(event.start).subtract(alarm_offset).format("YYYY-MM-DD")));
                */
                return  (
                            // event with same day
                            moment(event.start, "YYYY-MM-DD").isSame(today) ||
                            // event of the day after but with alarm on the day before
                            moment(today).isSame(
                                moment.utc(event.start).subtract(alarm_offset).format("YYYY-MM-DD"))
                        ) &&
                            // consider only event not passed
                         moment.utc(event.start).subtract(alarm_offset).isAfter(moment().utc("00:00"));
            });

            event_list.forEach(function(event){
                setAlarm(event);
            });
        },
        error: function (error) {
            errorDialog(error);
        }
    });

});

// init the Alarm for an event
function setAlarm(event){
    setTimeout(function(){
        // TO-DO: OTHER FUNCTIONS
        alarm_info(event)
    }, calculateTimeout(event))
}

//calculate timer in millis
function calculateTimeout(event){
    var alarm_offset = moment.duration(event.alarm_timer);
    var alarm_start = moment(event.start, "YYYY-MM-DD H:mm").subtract(alarm_offset);
    var result = alarm_start.diff(moment());

    // debug
    //console.log("setting timer to: " + result + " millis");
    return result;
}