// spawn a dialog
function spawnDialog(text, title, flag) {
    var dialog = document.querySelector('dialog');
    if (! dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    $("#warning_dialog").text(text);
    $("#warning_title").text(title);
    dialog.querySelector('.close').addEventListener('click', function() {
        if(flag) {

            // redirect navigation
            window.location = "./index.html";
            dialog.close();
        } dialog.close();
    });
}

// sign in -- login in handler
$(function() {
    $(document).submit(function(event) {

        // prevent the default http POST
        event.preventDefault();

        var email = $('#email').val();
        var pass = $('#password').val();

        // Post request
        $.ajax({
            url: 'http://127.0.0.1:5000/login',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify( { "email" : email, "password" : pass} ),
            success: function(token) {

            	if(token['token'] != 'none'){
                	// Saving token in a Cookie
                	Cookies.json = true;
                	Cookies.set("session_token", token['token']);

                	// Redirect on index.html
                    spawnDialog("Login successfully completed!", "", true);
                }
                else{
                    spawnDialog("Wrong email or password.", "Error");
                }
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