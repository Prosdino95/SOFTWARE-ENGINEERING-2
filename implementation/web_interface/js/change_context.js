
// jQuery script to load the html pages on index.html

$(function (){

    // Default load the welcome page
    $(document).ready(function () {

        // Cookie configuring as a json
        Cookies.json = true;
        //console.log("COOKIE: " + Cookies.get("session_token"));

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

    //load sidebar menu
    $("#menu-toggle").click(function(event){
        event.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
});