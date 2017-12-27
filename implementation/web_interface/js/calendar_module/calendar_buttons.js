// State variable
var button_timer;

// side effect methods
function block() { button_timer = false; }
function free()  { button_timer = true;  }

//Adding navigation bar calendar button view
function addingHeaderButtons() {

    $("#header_navigation").load("./html/event_section/calendar_header.html", function () {

        componentHandler.upgradeDom();

        $("#header_navigation").on('click', "#week_button", function(){
          setMonthView();
        });
        $("#header_navigation").on('click', "#agenda_button", function(){
          setAgendaView()
        });

        $("#more_button_list").on('click', "#button_list_month", function(){
            setMonthView()
        });
        $("#more_button_list").on('click', "#button_list_week", function(){
            setWeekView()
        });
        $("#more_button_list").on('click', "#button_list_day", function(){
            setDayView()
        });
        $("#more_button_list").on('click', "#button_list_agenda", function(){
            setAgendaView()
        });
    });
}

function setMonthView(){
    $("#full-calendar").fullCalendar("changeView", "month");
}

function setWeekView(){
    $("#full-calendar").fullCalendar("changeView", "agendaWeek");
}

function setDayView(){
    $("#full-calendar").fullCalendar("changeView", "agendaDay");
}

function setAgendaView(){
    $("#full-calendar").fullCalendar("changeView", "listMonth");
}

//setting prev and next buttons
function setControlButton(){

    $('<button>', {
        class: 'mdl-button mdl-js-button mdl-button--icon calendar_slide_button mdi mdi-36px ' +
                'mdl-color-text--primary mdi-chevron-right',
        id: 'next_day_button'
    }).appendTo('#stage');

    $('<button>', {
        class: 'mdl-button mdl-js-button mdl-button--icon calendar_slide_button mdi mdi-36px ' +
        'mdl-color-text--primary mdi-chevron-left',
        id: 'prev_day_button'
    }).appendTo('#stage');

    componentHandler.upgradeDom();

    $("#next_day_button").click(function(){
        $('#full-calendar').fullCalendar('next');
    });
    $("#prev_day_button").click(function(){
        $('#full-calendar').fullCalendar('prev');
    });
}

// delete calendar buttons
function deleteCalendarButtons(){

    // header buttons
    $('#week_button').remove();
    $('#agenda_button').remove();
    $('#more_button').remove();

    // list buttons
    $('#button_list_month').remove();
    $('#button_list_week').remove();
    $('#button_list_day').remove();
    $('#button_list_agenda').remove();

    // prev next buttons
    $('#next_day_button').remove();
    $('#prev_day_button').remove();
}


// create button for submit delete and modify event
function spawnButtons(eventClicked, position_flag) {

    passModifyID(eventClicked);
    passRemoveID(eventClicked);
    passEventRoute(eventClicked);

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

    if(position_flag) {
        $('<button>', {
            class: 'mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect ' +
            'add_button animated mdi mdi-map-marker mdl-color-text--white mdl-shadow--2dp',
            id: 'map_button'
        }).appendTo('#button_wrapper');
    }

    $('#modify_button').animateCss('bounceIn', function(){
    });
    $('#map_button').animateCss('bounceIn', function(){
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

    $('#map_button').animateCss('bounceOut', function () {
        $('#map_button').remove();
    });

    $('#delete_button').animateCss('bounceOut', function () {
        $('#delete_button').remove();
    });
    // endend the transition
    free();
}