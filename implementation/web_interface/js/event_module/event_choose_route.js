/**
 * @module event_module/event_choose_route
 * @description handles the creation of route table on event submit form.
 * @listen event_choose_route
 * @listen arrange_route
 */

$(function () {

    $("#stage").on("event_choose_route", function (event, route) {

        // sort jasonArray on time expected
        var routeData = route.sort(function (a, b) {
            if (a && b) {
                return parseInt(a.time) - parseInt(b.time);
            } else
                return route;
        });
        $("#display_route").load('./html/event_section/event_choose_route.html', function () {

            // create html
            for (var i in routeData) {
                console.log(routeData);
                $("#route_table").append(spawnRaw(routeData[i], i));
            }
            componentHandler.upgradeDom(); // important!

            // setting radio button events
            $('input[id*="route_"]').click(function (event) {
                var index = $(this).attr("value");
                componentHandler.upgradeDom();
                loadPath(routeData[index], draggableMap);
                $("#stage").trigger('bind_path', [routeData, index]);
            });

            // freeze map
            freezeMap();

            // NOT IMPLEMENTED
            /*    // transform get path button in cancel button
                $('#get_path').removeClass("mdl-button--colored").addClass("mdl-color--grey-100");
                $('#get_path').text("CANCEL");
                $('#get_path').attr('id', 'cancel_choose_route');

                componentHandler.upgradeDom(); // important!


                    $('#cancel_choose_route').click(function(event){
                        event.preventDefault();
                        $("#stage").trigger('unbind_path');
                        redirectDialog("Event Canceled", './travlendar.html');
                    });*/
            $('#get_path').remove();
        });
    });

    // spawn ArrangeRoute for map place
    $("#stage").on("arrange_route", function (event, eventClicked) {
        // refresh
        $("#display_route").empty();
        $("#display_route").load('./html/event_section/event_choose_route.html', function () {
            $("#route_table").append(spawnRaw(eventClicked.route, ""));
            $("#ROUTE_PATH").text("Event Title");
            $("#name_").text(eventClicked.title);
            $(".mdl-radio").remove();
            componentHandler.upgradeDom(); // important!
        });
    });

    /**
     * @external ".appendTo()"
     * @see {@link http://api.jquery.com/appendTo/}
     */

    /**
     * creates html table raw from a json.
     * @param {json} singleRoute - json object
     * @param {number} index - number of the path
     * @return {string}
     */
    function spawnRaw(singleRoute, index) {
        if (singleRoute) {
            var name = 'Route ' + index;
            var time = moment.duration(singleRoute['time'], "seconds").humanize();
            var distance = singleRoute['distance'] + "km";
            var vehicle = selectVehicle(singleRoute['method']);

            // html
            return "<tr>" +
                "<td class='mdl-data-table__cell--non-numeric' id='name_" + index + "'>" + name + "</td><" +
                "<td>" + vehicle + "</td>" +
                "<td>" + time + "</td>" +
                "<td>" + distance + "</td>" +
                "<td>" +
                "<label class='mdl-radio mdl-js-radio mdl-js-ripple-effect mdl-color-text--blue-grey-700' for='route_" + index + "'>" +
                "<input type='radio' id='route_" + index + "'class='mdl-radio__button' name='route' value=" + index + ">" +
                "<span class='mdl-radio__label'></span></label></td>" +
                "</tr>"
        }
        return ""
    }

    /**
     * creates icon to append on the html raw of the path
     * @param {json} json - json of the path
     * @return {string} html - html icon to append
     */
    function selectVehicle(json) {
        switch (json) {
            case "foot":
                return "<i class='mdi mdi-walk mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "bike":
                return "<i class='mdi mdi-bike mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "car":
                return "<i class='mdi mdi-car mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "public_transport":
                return "<i class='mdi mdi-subway-variant mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "train":
                return "<i class='mdi mdi-train mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "airplane":
                return "<i class='mdi mdi-airplane mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "bike_sharing":
                return "<i class='mdi mdi-bike mdi-24px mdl-color-text--blue-grey-700' href='https://www.bikemi.com/en/homepage.aspx'></i>";
            case "car_sharing":
                return "<i class='mdi mdi-car-connected mdi-24px mdl-color-text--blue-grey-700'></i>";
            case "green_mode":
                return "<i class='mdi mdi-earth mdi-24px mdl-color-text--green-500'></i>";
            default:
                return "";
        }
    }
});