function dialog(text, title, url){
    var dialog = document.querySelector('#trav_dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    dialog.showModal();
    $("#warning_dialog").text(text);
    if(title) {
        $("#warning_title").text(title);
    }
    dialog.querySelector('.close').addEventListener('click', function () {
        if(url) {
            // redirect navigation
            window.location = url;
        }
        dialog.close();
    });
}


// Spawn Dialog which redirect navigation
function redirectDialog(text, url) {
    dialog(text, false, url);
}

//Spawn Error Dialog
function errorDialog(text){
    dialog(text, 'Error', false);
}

//Spawn warning dialog
function submitDialog(text){
   dialog(text, false, false);
}
