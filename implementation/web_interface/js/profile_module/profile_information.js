/**
 * @module profile_module/profile_information
 * @description handles the change information of the profile.
 * @listens submit
 * @listens profile_load
 * @fires ajax post
 * @fires ajax get
 */

/**
 * Format correctly First_name and Last_name textfield values.
 * @param {String} string - the string to format
 * @returns {String} a string well formatted.
 */

// format correctly the text showed on the screen
function render_text(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

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
    $("#stage").on("profile_load", function () {
        $("#TITLE").text("Profile");
        $("#stage").load("./html/profile.html", function () {

            // create Profile Header
            loadProfileHeader();

            //get token from cookie
            Cookies.json = true;  // important
            var token = Cookies.get("session_token");

            // get request
            $.ajax({
                url: 'http://127.0.0.1:5000/getProfile?token=' + token,
                success: function (response) {

                    // redirect if token is null
                    sessionExpired(response);

                    var profile = response['profile'];
                    $("#first_name_textfield")[0].MaterialTextfield.change(profile['first_name']);
                    $("#last_name_textfield")[0].MaterialTextfield.change(profile['last_name']);
                    $("#email_textfield")[0].MaterialTextfield.change(profile['email']);
                    $("#cellphone_textfield")[0].MaterialTextfield.change(profile['cellphone']);

                    switch (profile['gender']) {
                        case "male":
                            document.querySelector('#gender_radio_male').MaterialRadio.check();
                            break;
                        case "female":
                            document.querySelector('#gender_radio_female').MaterialRadio.check();
                            break;
                        default:
                            document.querySelector('#gender_radio_male').MaterialRadio.uncheck();
                            document.querySelector('#gender_radio_female').MaterialRadio.uncheck();
                    }
                    (profile['notify_tel']) ? document.querySelector('#notificate_tel_checkbox').MaterialCheckbox.check() :
                        document.querySelector('#notificate_tel_checkbox').MaterialCheckbox.uncheck();

                    //update profile image
                    if (profile['image']) {
                        document.querySelector('#avatar_image').src = profile['image'];
                    }
                    componentHandler.upgradeDom();
                },
                error: function (error) {
                    window.location = "html/server_down.html"
                }
            });
        });
    });


    // Submit new profile information -- delegate to descendants
    $("#stage").on("submit", "#information-panel", function (event) {

        event.preventDefault();

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        var first_name = render_text($('#first_name').val());
        var last_name = render_text($('#last_name').val());
        var cellphone = $('#cellphone').val();
        var gender = $('input[name = gender]:checked').val();

        // NOT IMPLEMENTED YET
        // var email = $('#email').val();
        //  var notify_tel = $('input[id = notificate-tel]').prop("checked");
        // var notify_email = $('input[id = notificate-email]:checked').val();


        // show loading page
        showLoading();

        // Post request to /modProfile
        $.ajax({
            url: 'http://127.0.0.1:5000/modProfile',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({
                "token": token,
                "first_name": first_name, "last_name": last_name,
                "cellphone": cellphone, "gender": gender
            }),

            success: function (response) {

                // redirect if token is null
                sessionExpired(response);

                //hide loading
                hideLoading();

                // Show a friendly event_section
                submitDialog("Informations updated correctly.");

                // update change name
             //   document.querySelector('#first_name_drawer').text(first_name);
                componentHandler.upgradeDom();
            },
            error: function (error) {
                errorDialog(error);
            }
        });
    });
});