(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No Selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        //More code to go here
        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);

            if (data['size'] === "bomb" && data['flavor'] != "") {
                if (data['power-up'] == 'none') {
                    $('#myModal').modal('show');
                    $('#myModal').on('click', '#powerful', function(event) {
                        //event.preventDefault();
                        if (data['emailAddress']) {
                            $('#power-ups').toggle();
                            $('#myModal').modal('hide');
                            $('#no-email-entered').css('display', 'none');
                        } else {
                            $('#no-email-entered').css('display', 'block');
                            $('#myModal').modal('hide');
                        }

                    });
                }
            } else {
                this.reset();
            }
        });
    };


    FormHandler.prototype.rangeOutput = function() {
        this.$formElement.on('input change', '#strengthLevel', function(event) {
            event.preventDefault();
            $('#num').html($(this).val());

            if ($(this).val() <= 30) {
                $('#num').css('background-color', 'yellow');
            } else if ($(this).val() > 30 && $(this).val() <= 60) {
                $('#num').css('background-color', 'green');
            } else {
                $('#num').css('background-color', 'red');
            }
        });
    };

    //FormHandler.prototype.achievementHandler = function(orders){
    //  console.log(orders);
    //}


    App.FormHandler = FormHandler;
    window.App = App;


})(window);

/*($('#strengthLevel').on('drag', function(event){
  event.preventDefault();
    $('#coffee-strength').value = $('#strengthLevel').value;
}))();
*/
