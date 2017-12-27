function loadProfileHeader(){

    // create buttons
    $('<a>', {
       class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "My Information",
        id : "profile_information_link",
        href: ''
    }).appendTo("#header_navigation");

    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Profile Picture",
        id : "profile_picture_link",
        href: ''
    }).appendTo("#header_navigation");

    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Change Password",
        id : "profile_password_link",
        href: ''
    }).appendTo("#header_navigation");

    componentHandler.upgradeDom();

    // click event settings
  //  $("#header_navigation").on('click', '#profile_information_link', function(e){
    $("#profile_information_link").click(function(e){
        e.preventDefault();
        $(".mdl-tabs__tab:eq(0) span").click();
    });

    $("#profile_picture_link").click(function(e){
        e.preventDefault();
        $(".mdl-tabs__tab:eq(1) span").click();
    });

    $("#profile_password_link").click(function(e){
        e.preventDefault();
        $(".mdl-tabs__tab:eq(2) span").click();
    });

}

function deleteProfileHeader(){
    $("#profile_information_link").remove();
    $("#profile_picture_link").remove();
    $("#profile_password_link").remove();
}