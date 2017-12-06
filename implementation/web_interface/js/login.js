
// check valid email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// sign in -- login in handler
$(function() {
    $(document).submit(function(event) {

        // prevent the default http POST
        event.preventDefault();

        var email = $('#email').val();
        var pass = $('#password').val();

        // Check valid email
        if(!validateEmail(email)){
            alert("Not valid email address");
            throw error();
        };

        // Post request
        alert("OK");
        $.ajax({
            url: 'http://127.0.0.1:5000/registration',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify( { "email" : email, "password" : pass} ),
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