
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
        $.ajax({
            url: 'http://127.0.0.1:5000/login',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify( { "email" : email, "password" : pass} ),
            success: function(token) {

                // Saving Token in a Cookie
                Cookies.json = true;
                Cookies.set("session_token", token);

                // Redirect on index.html
                window.location = "./index.html";
            },
            error: function(error) {
                console.log(error);
            }
        });
        // Clear input field
        $(":input").val('');
    });

    /**
     * BUG FIX ISSUE: MDL Library -- Required Input field
     * Check the validity state and update field accordingly.
     *
     *see https://github.com/google/material-design-lite/issues/1502 for more info
     *
     * @public
     */
    MaterialTextfield.prototype.checkValidity = function () {
        if (this.input_.validity.valid) {
            this.element_.classList.remove(this.CssClasses_.IS_INVALID);
        } else {
            if (this.element_.getElementsByTagName('input')[0].value.length > 0) {
                this.element_.classList.add(this.CssClasses_.IS_INVALID);
            }
        }
    };
});