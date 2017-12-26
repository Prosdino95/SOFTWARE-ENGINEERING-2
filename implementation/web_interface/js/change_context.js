
// jQuery script to load the html pages on index.html
$(function (){

    // Default load the welcome page
    $(document).ready(function () {
        $("#stage").load("./html/welcome.html");
        $("#TITLE").text("Home");

        deleteCalendarButtons();
    });

    // load Welcome page
    $("#welcome").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/welcome.html");
        $("#TITLE").text("Home");

        deleteCalendarButtons()
    });

    // load calendar page
    $("#calendar").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/calendar.html");
        $("#stage").trigger("calendar_load");
        $("#TITLE").text("Calendar");

        addingHeaderButtons();
    });

    // load preference page
    $("#preferences").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/preferences.html");
        $("#TITLE").text("Preferences");

        deleteCalendarButtons()
    });

    // load profile page
    $("#profile").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/profile.html");
        $("#TITLE").text("Profile");

        deleteCalendarButtons()
    });
});