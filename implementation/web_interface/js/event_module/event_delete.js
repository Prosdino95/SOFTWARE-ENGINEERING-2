var remove_id;

$(function () {

    $("#stage").on('click', '#delete_button', function () {

        $('#extra').load("./html/event_section/event_delete.html", function () {
            componentHandler.upgradeDom();

            var remove_dialog = document.querySelector("#extra_dialog");
            if (!remove_dialog.showModal) {
                dialogPolyfill.registerDialog(remove_dialog);
            }
            $("#name_event").text(remove_id.title);
            remove_dialog.showModal();
            remove_dialog.querySelector(".cancel_remove_event").addEventListener('click', function () {
                remove_dialog.close();
                document.querySelector("#extra_dialog").remove();
                componentHandler.upgradeDom();
            });

            remove_dialog.querySelector(".remove_event_button_dialog").addEventListener('click', function () {
                remove_dialog.close();
                document.querySelector("#extra_dialog").remove();

                // Loading screen
                showLoading();
                componentHandler.upgradeDom();

                //get token from cookie
                Cookies.json = true;  // important
                var token = Cookies.get("session_token");

                $.ajax({
                    url: 'http://127.0.0.1:5000/delEvent',
                    dataType: 'text',
                    contentType: "application/json; charset=utf-8",
                    type: 'post',
                    data: JSON.stringify({
                        "token": token, "id": remove_id.id
                    }),

                    success: function (response) {
                        // Show a friendly event_section
                        redirectDialog("Event removed correctly.", './index.html');
                        hideLoading();
                        },
                    error: function (error) {
                        errorDialog(error);
                    }
                });
            });

        });
    });
});

function passRemoveID(eventClicked) {
    remove_id = eventClicked;
};