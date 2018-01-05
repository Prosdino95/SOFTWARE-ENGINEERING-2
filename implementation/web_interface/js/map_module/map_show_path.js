/**
 * @module map_module/map_show_path
 * @description handles the click on the show path button
 */

$(function () {
    $("#stage").on("click", "#map_button", function (event) {
        event.preventDefault();

        /**
         * @external ".load()"
         * @see {@link http://api.jquery.com/load/}
         */
        $("#stage").load("./html/map.html", function () {
            $("#TITLE").text("Show route path");
            // delete header and add event buttons
            deleteCalendarButtons();
            $("#add_event").remove();
        });

        /**
         * @external ".appendTo()"
         * @see {@link http://api.jquery.com/appendTo/}
         */

        $('<a>', {
            class: "mdl-navigation__link mdl-typography--font-bold",
            text: "Go Back",
            id: "map_go_back_link"
        }).appendTo("#header_navigation");

        $("#map_go_back_link").click(function () {
            deleteShowPathHeader();
            passEventRoute(null);
            $("#calendar").click();
        });
    });
});

/**
 * delete the show path header buttons
 */
function deleteShowPathHeader() {
    $("#map_go_back_link").remove();
}