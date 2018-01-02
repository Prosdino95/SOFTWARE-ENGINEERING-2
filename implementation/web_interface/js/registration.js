
// format correctly First_name and Last_name
function render_text(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

// check if password and retype password are the same
function passwordCheck(password, retype_password) {
    return password === retype_password;
}

// sign up -- registration handler
$(function() {
    $(document).submit(function(event) {

        // prevent the default http POST
        event.preventDefault();

        var first_name = render_text($('#first_name').val());
        var last_name = render_text($('#last_name').val());
        var email = $('#email').val();
        var pass = $('#password').val();
        var retype_pass = $('#retype_password').val();

        // Check passwords match
        if(!passwordCheck(pass, retype_pass)){
            errorDialog("Passwords do not match.");
            throw error();
        };

        // Post request
        $.ajax({
            url: 'http://127.0.0.1:5000/registration',
            dataType: 'text',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify( { "first_name": first_name, "last_name": last_name, "password": pass, "email": email } ),
            success: function(response) {
                (response === 'ok')? redirectDialog("Registration completed successfully!", "./index.html"): errorDialog("Registration failed");
            },

            error: function(error) {
                errorDialog(error);
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
