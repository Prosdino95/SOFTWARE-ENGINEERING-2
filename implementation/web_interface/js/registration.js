$(function() {
    $('#submit').click(function() {
        var user = $('#name').val();
        var pass = $('#password').val();
        var email = $('#email').val();
        $.ajax({
            url: 'http://127.0.0.1:5000/registration',
            dataType: 'json',
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
    });
});
