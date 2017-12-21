// State variable
var button_timer;

// side effect methods
function block() { button_timer = false; }
function free()  { button_timer = true;  }

function spawnButtons(eventClicked) {


    passModifyID(eventClicked);
    passRemoveID(eventClicked);

    $('#add_event').animateCss('bounceOut', function () {
        $('#add_event').hide()
    });

    $('<button>', {
        class: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ' +
        'add_button animated mdi mdi-pencil mdl-color-text--grey-600 mdl-shadow--2dp',
        id: 'modify_button'
    }).appendTo('#button_wrapper');

    $('<button>', {
        class: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ' +
        'add_button animated mdi mdi-close mdl-color-text--red-100 mdl-shadow--2dp',
        id: 'delete_button'
    }).appendTo('#button_wrapper');

    $('#modify_button').animateCss('bounceIn', function(){
    });
    $('#delete_button').animateCss('bounceIn', function(){
    });
    componentHandler.upgradeDom();
    // close transition
    block();
}

function deleteButtons() {

    $('#modify_button').animateCss('bounceOut', function () {
        $('#modify_button').remove();
        $('#add_event').show();
        $('#add_event').animateCss('bounceIn');
    });

    $('#delete_button').animateCss('bounceOut', function () {
        $('#delete_button').remove();
    });
    // endend the transition
    free();
}