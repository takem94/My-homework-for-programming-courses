"use strict";

var SIZE_SMALL        = { price: 50, calories: 20, name: 'small' };
var SIZE_LARGE        = { price: 100, calories: 40, name: 'large' };

var STUFFING_CHEESE   = { price: 10, calories: 20, name: 'cheese' };
var STUFFING_SALAD    = { price: 20, calories: 5, name: 'salad' };
var STUFFING_POTATO   = { price: 15, calories: 10, name: 'potato' };

var TOPPING_MAYO      = { price: 20, calories: 5, name: 'mayo' };
var TOPPING_SPICE     = { price: 15, calories: 0, name: 'spice' };

function Hamburger(size, stuffing) {
    this.humSize = size;
    this.humStuffing = stuffing;

    this.price = (this.humStuffing.price + this.humSize.price);
    this.calories = (this.humStuffing.calories + this.humSize.calories);

    this.humTopping = [];
}

Hamburger.prototype.getPrice = function() {
    return this.price;
};

Hamburger.prototype.getCalories = function() {
    return this.calories;
};


Hamburger.prototype.addTopping = function(topping) {
    if (
        (this.humTopping.length === 0)
        || (this.humTopping[0].name !== topping.name && this.humTopping.length <= 2)
    )
        this.humTopping.push(topping);
};

Hamburger.prototype.removeTopping = function (topping) {
    if (this.humTopping.length > 0) {
        for (let i = 0; i < this.humTopping.length; ++i) {
            if (this.humTopping[i].name === topping.name) {
                this.humTopping.splice(i, 1);
                this.calcAll();
                return this.humTopping;
            }
        }
    }
    return 0;
};

Hamburger.prototype.calcAll = function () {
    let tempToppingPrice = 0;
    let tempToppingCalories = 0;

    if(this.humTopping.length !== 0){
        for (let i = 0; i < this.humTopping.length; ++i) {
            tempToppingPrice += this.humTopping[i].price;
            tempToppingCalories += this.humTopping[i].calories;
        }
    }

    this.price += tempToppingPrice;
    this.calories += tempToppingCalories;

    return {price: this.price, calories: this.calories}
};