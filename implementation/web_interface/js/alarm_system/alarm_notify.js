/**
 * @module alarm_system/alarm_notify
 * @description handles the creation of the alarm message.
 */

/**
 * @external "Event Object"
 * @see {@link https://fullcalendar.io/docs/event_data/Event_Object/}
 */

/**
 * @external "toastr"
 * @see {@link https://codeseven.github.io/toastr/}
 */

/**
 * creates the alarm message info.
 * @param {Event_Object} event
 */

function alarm_info(event){

    toastr["info"]("The event " + event.title + " it's starting!\n " + event.alarm_message, "Info");

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
}