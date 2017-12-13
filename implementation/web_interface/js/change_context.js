
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
    });

    // load preference page
    $("#preferences").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/preferences.html");
    });

    // load preference page
    $("#profile").click(function(event){
        event.preventDefault();
        $("#stage").load("./html/profile.html");
    });
});