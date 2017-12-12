$(function() {
    $(document).ready(function (){

        //get from cookie
        var token = "Cm6oUaAiq_FF1yaz1u9c5zWmJ0rMZda5-_cdzB77_NU"

        // Post request
        $.ajax({
            url: 'http://127.0.0.1:5000/getProfile?token='+token,
            success: function(response) {
                console.log(response)
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
});   



// Object { first_name: "tizio", last_name: "bbb" } 