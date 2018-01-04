// Loading Screen Handler

/**
 * @module loading_screen
 * @description Handles the loading screen
 */

/**
 * @external ".css()"
 * @see {@link http://api.jquery.com/css/}
 */

/**
 * showLoading
 * @global
 */

function showLoading(){
    $("#loading_screen").css('visibility', 'visible');
}

/**
 * hideLoading
 * @global
 */

function hideLoading(){
    $("#loading_screen").css('visibility', 'hidden')
}