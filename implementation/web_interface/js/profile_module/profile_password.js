/*
     Update user password module.
*/

// check if password and retype password are the same and not empty
function passwordCheck(password, retype_password) {
     return !(password.length === 0) && (password === retype_password);
}

// main function
$(function() {
    $("#stage").on("click", "#submit_password", function (event){

        event.preventDefault();

        //get token from cookie
        Cookies.json = true;  // important
        var token = Cookies.get("session_token");

        var current_password = $('#current_password').val();
        var new_password = $('#new_password').val();
        var retype_new_password = $('#retype_new_password').val();

        // password check
        if(!passwordCheck(new_password, retype_new_password)){

            // TO-DO: pop-up more user friendly
            alert("The new passwords do not match");
            throw error;
        }

        // ajax post request
        $.ajax({
            url: 'http://127.0.0.1:5000/modProfilePassword',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify( { "token" : token,
                "current_password": current_password, "new_password": new_password} ),

            success: function(response) {
                console.log(response);
                // TO-DO: pop-up more user friendly
                alert(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});