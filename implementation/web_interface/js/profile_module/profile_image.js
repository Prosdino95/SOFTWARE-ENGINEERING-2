/*
     Update user picture.
*/

$(function (){

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

        $.ajax({
            url: 'http://127.0.0.1:5000/modProfile',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({ "token" : token,
                                   "image": data }),

            success: function(response) {
                console.log(response);
                // if ok, update the picture in drawer too
                document.querySelector('#avatar').src = data;

                // spawn event_section
                submitDialog("Profile picture updated successfully!");
            },
            error: function(error) {
                errorDialog(error);
            }
        });
    });

    //  Preview the chosen image profile to the user
    $("#stage").on("change", "#url_button", function (event){

        event.preventDefault();
        var file = document.querySelector('#url_button').files[0];
        console.log(file.size);
        var avatar = document.querySelector('#avatar_image');
        var reader = new FileReader();

        // max 1 Mb
        if(file.size > 1000000){

            // Show a friendly event_section
            errorDialog("Image too bigger");
            throw error();
        }

        reader.addEventListener("load", function () {
            avatar.src = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    });

});