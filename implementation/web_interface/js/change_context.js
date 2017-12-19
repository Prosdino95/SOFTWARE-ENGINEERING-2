
// jQuery script to load the html pages on index.html
$(function (){

    // Default load the welcome page
    $(document).ready(function () {
        $("#stage").load("./html/welcome.html");
    });

    // load Welcome page
    $("#welcome").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/welcome.html");
    });

    // load calendar page
    $("#calendar").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/calendar.html");
        $("#stage").trigger("calendar_load");
    });

    // load preference page
    $("#preferences").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/preferences.html");
    });

    // load profile page
    $("#profile").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/profile.html");
    });

    // load submit event page
    $("#stage").on("click", "#add_event", function (event) {
        event.preventDefault();
        $("#stage").load("./html/event_section/event_submit.html")
    });
});