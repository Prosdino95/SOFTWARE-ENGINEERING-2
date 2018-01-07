/**
 * @module profile_module/profile_picture
 * @description handles the change picture.
 * @listens click
 * @listens change
 * @fires ajax
 */

$(function (){


    /**
     * @external ".click()"
     * @see {@link http://api.jquery.com/click/}
     */

    /**
     * @external ".on()"
     * @see {@link http://api.jquery.com/on/}
     */

    /**
     * @external "jQuery.ajax"
     * @see {@link http://api.jquery.com/category/ajax/global-ajax-event-handlers/}
     */

    // Submit the new image profile
    $("#stage").on("click", "#submit_picture", function (event){

        // get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        var file = document.querySelector('#url_button').files[0];
        var avatar = document.querySelector('#avatar_image');

        // base64 encoded data
        var data = avatar.src;

        // cancel submit if user doesn't choose an image
        if (!file){

            // spawn error
            errorDialog("File not selected");
            throw error;
        }

        // show loading page
        showLoading();

        /**
         * @external "jQuery.ajax"
         * @see {@link http://api.jquery.com/category/ajax/global-ajax-event-handlers/}
         */

        $.ajax({
            url: 'http://127.0.0.1:5000/modProfile',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({ "token" : token,
                                   "image": data }),

            success: function(response) {

                //hide loading page
                hideLoading();

                // if ok, update the picture in drawer too
                document.querySelector('#avatar').src = data;

                // spawn event_section
                submitDialog("Profile picture updated successfully!");
            },
            error: function(error) {
                window.location = "html/server_down.html"
            }
        });
    });


    /**
     * @external ".change()"
     * @see {@link http://api.jquery.com/change/}
     */

    //  Preview the chosen image profile to the user
    $("#stage").on("change", "#url_button", function (event){

        event.preventDefault();
        var file = document.querySelector('#url_button').files[0];
        var avatar = document.querySelector('#avatar_image');
        var reader = new FileReader();

        // max 10 Mb
        if(file.size > 10000000){

            // Show a friendly event_section
            errorDialog("Image too big");
            throw "Image too big";
        }

        reader.addEventListener("load", function () {
            avatar.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });

});