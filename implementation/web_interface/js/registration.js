
// check if password and retype password are the same
function passwordCheck(password, retype_password) {
    return password === retype_password;

}

// check valid email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// sign up -- registration handler
$(function() {
    $(document).submit(function(event) {

        // prevent the default http POST
        event.preventDefault();

        var user = $('#name').val();
        var email = $('#email').val();
        var pass = $('#password').val();
        var retype_pass = $('#retype-password').val();

        // Check passwords match
        if(!passwordCheck(pass, retype_pass)){
            alert("Passwords do not match");
            throw error();
        };

        // Check valid email
        if(!validateEmail(email)){
            alert("Not valid email address");
            throw error();
        };

        // Post request
        alert("OK");
        $.ajax({
            url: 'http://127.0.0.1:5000/registration',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify( { "name": user, "password": pass, "email": email } ),
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
        // Clear input field
        $(":input").val('');
    });

});
