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

            //show modal if and only if size = bomb, flavor != empty, strength = 100
            if (data['size'] === "bomb" && data['flavor'] != "" && data['strength'] === '100') {
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
                    console.log(data);
                    fn(data);

                    this.reset();
                    $('#power-ups').css('display', 'none');
                    $(".cbox").attr("checked", false);
                    $('#num').html('30');
                    $('#num').css('background-color', 'green');

                    this.elements[0].focus();
                }
            } else {
                console.log(data);
                fn(data);

                this.reset();
                $('#power-ups').css('display', 'none');
                $(".cbox").attr("checked", false);
                $('#num').html('30');
                $('#num').css('background-color', 'green');


                this.elements[0].focus();
            }
        });

        this.$formElement.on('reset', function(event) {

            $('#num').html('30');
            $('#power-ups').css('display', 'none');
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;


})(window);
