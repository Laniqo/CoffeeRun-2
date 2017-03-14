//To recieve the window object for use inside the function body and retrieves
//the constructors you defines as part of the window.App namespace
(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    //var RATE_SELECTOR = '[data-coffee="rate"]';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;

    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    formHandler.rangeOutput();
    //formHandler.achievementHandler(myTruck.printOrders.bind(myTruck));
    console.log(formHandler);


})(window);
