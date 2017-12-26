function modifyLight(event, revertFunc){

    $('#extra').load("./html/event_section/event_light_modify.html", function () {
        componentHandler.upgradeDom();
        var modify_dialog = document.querySelector("#extra_dialog");
        if (!modify_dialog.showModal) {
            dialogPolyfill.registerDialog(modify_dialog);
        }
        $("#name_event").text(event.title);
        modify_dialog.showModal();
        modify_dialog.querySelector(".cancel_modify_event").addEventListener('click', function () {
            modify_dialog.close();
            document.querySelector("#extra_dialog").remove();
            componentHandler.upgradeDom();
            revertFunc(); //callback
        });

        modify_dialog.querySelector(".modify_event_button_dialog").addEventListener('click', function () {
            modify_dialog.close();
            document.querySelector("#extra_dialog").remove();
            componentHandler.upgradeDom();

            //get token from cookie
            Cookies.json = true;  // important
            var token = Cookies.get("session_token");
            var end;

            // only one day event for FC have end = null
            if(event.end){
                end = event.end;
            }else
                end = event.start;

            $.ajax({
                url: 'http://127.0.0.1:5000/modEvent',
                dataType: 'text',
                contentType: "application/json; charset=utf-8",
                type: 'post',
                data: JSON.stringify({
                    "token": token, "id": event.id,
                    "start": (event.start).format("YYYY-MM-DD HH:mm") + "+00:00", "end": end.format("YYYY-MM-DD HH:mm")+ "+00:00"
                    // default format: YYYY-MM-DDTHH:mm:ss+00:00
                }),

                success: function (response) {
                    // Show a friendly event_section
                    submitDialog("Event modified correctly.");
                },
                error: function (error) {
                    errorDialog(error);
                }
            });
        });
    });
}