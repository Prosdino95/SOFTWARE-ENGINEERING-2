
// jQuery script to load the html pages on index.html

$(function (){

    // Default load the welcome page
    $(document).ready(function () {
        $("#stage").load("./html/welcome.html");
    });

    // load calendar page
    $("#calendar").click(function(){
        $("#stage").load("./html/calendar.html");
    });

    // load preference page
    $("#preferences").click(function(){
        $("#stage").load("./html/preferences.html");
    });

    //load sidebar menu
    $("#menu-toggle").click(function(e){
        $("#wrapper").toggleClass("toggled");
    });
});