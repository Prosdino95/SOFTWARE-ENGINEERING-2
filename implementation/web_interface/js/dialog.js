/**
 * @module dialog
 * @description handles the dialog screen
 *
 */

/**
 * build the correct dialog.
 *
 * @param {String} text
 * @param {String} title
 * @param {String} url
 */
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
            resetDialog();
            dialog.close();
        }
        resetDialog();
        dialog.close();
    });
}

/**
 * reset the current dialog
 * @external ".text()"
 * @see {@link http://api.jquery.com/text/}
 */
function resetDialog(){
    $("#warning_dialog").text("");
    $("#warning_title").text("");
}

/**
 * Spawns Dialog which redirect navigation to the url passed.
 *
 * @param {String} text
 * @param {String} url
 */
function redirectDialog(text, url) {
    resetDialog();
    dialog(text, false, url);
}

/**
 * Spawns an error Dialog.
 *
 * @param {String} text
 */

function errorDialog(text){
    resetDialog();
    dialog(text, 'Error', false);
}

/**
 * Spawns a submit Dialog.
 *
 * @param {String} text
 */
function submitDialog(text){
    resetDialog();
    dialog(text, false, false);
}

/**
 * rRedirect to index.html if Token is null
 *
 * @param response
 */
function sessionExpired(response){
/*    if (response === "Session Expired"){
        redirectDialog("Session Expired", "./index.html")
    }else{
    window.location = "html/server_down.html"*/
}