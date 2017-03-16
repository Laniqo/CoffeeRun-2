(function(window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;
    var i;

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
        this.$formElement.on('input change', '#strengthLevel', function(event) {
            event.preventDefault();
            $('#num').html($(this).val());

            if ($(this).val() < 30) {
                $('#num').css('background-color', 'yellow');
            } else if ($(this).val() >= 30 && $(this).val() <= 60) {
                $('#num').css('background-color', 'green');
            } else {
                $('#num').css('background-color', 'red');
            }
        });

        this.$formElement.on('submit', function(event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });


            if (data['size'] === "bomb" && data['flavor'] != "") {
                //event.preventDefault();
                $('#no-email-entered').css('display', 'none');

                if (data['powerupOne'] === undefined && data['powerupTwo'] === undefined && data['powerupThree'] === undefined) {

                    $('#myModal').modal('show');

                    $('#myModal').on('click', '#powerful', function(event) {
                        event.preventDefault();

                        if (data['emailAddress'] != "") {

                            $('#power-ups').css('display', 'block');
                            $('#myModal').modal('hide');
                            $('#no-email-entered').css('display', 'none');
                            //$('#num').html('30');
                        } else {
                            $('#no-email-entered').css('display', 'block');
                            $('#myModal').modal('hide');
                        }

                    });

                    $('#myModal').on('click', '#powerless', function(event) {
                        event.preventDefault();
                        $('#myModal').modal('hide');

                    });
                } else {
                    fn(data);
                    this.reset();
                    this.elements[0].focus();
                    console.log(data);
                    $('#power-ups').css('display', 'none');
                    $(".cbox").attr("checked", false);
                    $('#num').html('30');
                }
            } else {
                fn(data);
                console.log(data);
                $('#power-ups').css('display', 'none');
                $(".cbox").attr("checked", false);
                $('#num').html('30');
                this.reset();
                this.elements[0].focus();
            }
        });

        this.$formElement.on('reset', function(event) {

            $('#num').html('30');
            $('#power-ups').css('display', 'none');
        });
    };



    /*
        FormHandler.prototype.rangeOutput = function() {
            this.$formElement.on('input change', '#strengthLevel', function(event) {
                //event.preventDefault();
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
        */


    App.FormHandler = FormHandler;
    window.App = App;


})(window);

/*($('#strengthLevel').on('drag', function(event){
  event.preventDefault();
    $('#coffee-strength').value = $('#strengthLevel').value;
}))();
*/
