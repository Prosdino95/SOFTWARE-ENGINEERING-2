// show path feature
$(function(){
    $("#stage").on("click", "#map_button", function (event) {
        event.preventDefault();
        $("#stage").load("./html/map.html", function(){
            $("#TITLE").text("Show route path");
            // delete header and add event buttons
            deleteCalendarButtons();
            $("#add_event").remove();
        });

        $('<a>', {
            class : "mdl-navigation__link mdl-typography--font-bold",
            text : "Go Back",
            id : "map_go_back_link"
        }).appendTo("#header_navigation");

        $("#map_go_back_link").click(function(){
            deleteShowPathHeader();
            $("#calendar").click();
        });
    });
});

function deleteShowPathHeader(){
    $("#map_go_back_link").remove();
}