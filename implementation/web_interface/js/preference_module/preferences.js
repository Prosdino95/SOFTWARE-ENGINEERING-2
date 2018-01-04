/**
 * @module preference_module/preferences
 * @description handles the preference of the user.
 * @listens preference_load
 * @listens click
 * @fires ajax post
 * @fires ajax get
 */

/**
 * @external ".load()"
 * @see {@link http://api.jquery.com/load/}
 */

/**
 * @external ".on()"
 * @see {@link http://api.jquery.com/on/}
 */

/**
 * @external "jQuery.ajax"
 * @see {@link http://api.jquery.com/category/ajax/global-ajax-event-handlers/}
 */

// main function
$(function () {

    // Update the input field information value quering the database
    $("#stage").on("preference_load", function () {

        $("#TITLE").text("Preferences");
        $("#stage").load("./html/preferences.html", function () {

            // setting header
            loadPreferenceHeader();
            //get token from cookie
            Cookies.json = true;  // important
            var token = Cookies.get("session_token");

            // Post request
            $.ajax({
                url: 'http://127.0.0.1:5000/getProfilePreference?token=' + token,
                success: function (preference) {

                    $.each(preference, function (key, val) {
                        if (key != "green_mode")
                            (preference[key]) ? document.querySelector('#' + key).MaterialIconToggle.check() :
                                document.querySelector('#' + key).MaterialIconToggle.uncheck();
                        else
                            (preference[key]) ? document.querySelector('#green_mode').MaterialSwitch.on() :
                                document.querySelector('#green_mode').MaterialSwitch.off();
                    });

                    componentHandler.upgradeDom();
                },
                error: function (error) {
                    errorDialog(error);
                }
            });
        });
    });


    // Submit new preference profile information
    $("#stage").on("click", "#submit-preferences", function (event) {

        event.preventDefault();

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        var preference = JSON.stringify(
            {
                token: token,
                foot: $('input[id = foot-like]').prop("checked"),
                bike: $('input[id = bike-like]').prop("checked"),
                car: $('input[id = car-like]').prop("checked"),
                public_transport: $('input[id = atm-like]').prop("checked"),
                train: $('input[id = train-like]').prop("checked"),
                airplane: $('input[id = airplane-like]').prop("checked"),
                bike_sharing: $('input[id = bike-sharing-like]').prop("checked"),
                car_sharing: $('input[id = car-sharing-like]').prop("checked"),
                green_mode: $('input[id = green-mode]').prop("checked")
            });

        // show loading page
        showLoading();

        // Post request
        $.ajax({
            url: 'http://127.0.0.1:5000/modProfilePreference',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: preference,

            success: function (response) {

                //hide loading page
                hideLoading();

                // Show a friendly event_section
                submitDialog("Preferences submitted correctly")
            },
            error: function (error) {
                errorDialog(error);
            }
        });
    });
});
