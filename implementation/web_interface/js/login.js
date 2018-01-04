/**
 * @module login
 * @description login event handler
 * @listens event submit event in document scope
 * @fires ajax post request
 *
 */

$(function () {
    /**
     * @external ".submit()"
     * @see {@link http://api.jquery.com/submit/}
     */
    $(document).submit(function (event) {

        // prevent the default http POST
        event.preventDefault();

        var email = $('#email').val();
        var pass = $('#password').val();

        //show loading page
        showLoading();

        /**
         * @external "jQuery.ajax"
         * @see {@link http://api.jquery.com/category/ajax/global-ajax-event-handlers/}
         */

        // Post request
        $.ajax({
            url: 'http://127.0.0.1:5000/login',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            type: 'post',
            data: JSON.stringify({"email": email, "password": pass}),
            success: function (token) {

                componentHandler.upgradeDom();

                // hide loading page
                hideLoading();

                if (token['token'] !== 'none') {
                    // Saving token in a Cookie
                    Cookies.json = true;
                    Cookies.set("session_token", token['token']);

                    // Redirect on travlendar.html
                    redirectDialog("Login successfully completed!", "./travlendar.html");
                }
                else {
                    // hide loading page
                    hideLoading();
                    errorDialog("Wrong email or password.");
                }
            },
            error: function (error) {
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