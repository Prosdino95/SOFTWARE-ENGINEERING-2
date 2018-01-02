// truncate the string to first 10 chars
//function max_string(string){
//    if(string.length > 12)
//        return string.charAt(0).toUpperCase() + string.substring(1,9) + "..."
//    else
//        return string;
//}

// Renders profile information on travlendar.html
function get_profile() {
    //get token from cookie
    Cookies.json = true;  // important
    var token = Cookies.get("session_token");

    // get request
    $.ajax({
        url: 'http://127.0.0.1:5000/getProfile?token=' + token,
        success: function (response) {

            var profile = response['profile'];

            // Update Welcome Page
            $("#first_name").text(profile['first_name']);
            $("#last_name").text(profile['last_name']);

            // Update Left Drawer
            $("#first_name_drawer").text(profile['first_name']);

            (profile['image'])? document.querySelector('#avatar').src = profile['image']:

            componentHandler.upgradeDom();
        },
        error: function (error) {
            errorDialog(error);
        }
    });
}

$(function () {
    $(document).ready(function () {
        get_profile();
    });

    $("#welcome").click(function(event){
        event.preventDefault();
        get_profile();
    });
});