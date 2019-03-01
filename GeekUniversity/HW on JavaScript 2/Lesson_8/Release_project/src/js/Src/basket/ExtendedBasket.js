function ExtendedBasket(idBasket,$basketList,$basketTotalPrice,$basketNotCounter,$basketExtendList,$tableTotalPrice,$tableSubPrice,$template) {
    Basket.call(this,idBasket,$basketList,$basketTotalPrice,$basketNotCounter);

    this.extendItemTemplate = $template;
    this.basketExtendList = $basketExtendList;
    this.tableTotalPrice = $tableTotalPrice;
    this.tableSubPrice = $tableSubPrice;

    this.loadBasketItems();
}

ExtendedBasket.prototype = Object.create(Basket.prototype);
ExtendedBasket.prototype.constructor = ExtendedBasket;

ExtendedBasket.prototype.loadBasketItems = function () {
    $.get({
        url: './json/cart-page.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            this.basketItems = data;
            this.refresh();
        }
    });
};

ExtendedBasket.prototype.createExtendBasketItems = function (elem) {
    var item = this.extendItemTemplate.clone();

    item.attr("data-id",elem.id);

    item.find('.basket-table__product-img img').attr('src',elem.img);
    item.find('.basket-table__product-title').text(elem.title);
    item.find('.basket-table__product-option_value')[0].innerText = elem.color;
    item.find('.basket-table__product-option_value')[1].innerText = elem.size;
    item.find('.basket-table__unit-price-value').text('$'+elem.price);
    item.find('.basket-table__quantity-input').val(elem.amount);
    item.find('.basket-table__shiping-value')[1].innerText = '$' + elem.amount * elem.price;

    return item;
};

ExtendedBasket.prototype.render = function () {

    for (var key in this.basketItems) {
        var eArr = this.basketItems[key],
            extElem = this.createExtendBasketItems(eArr);

        this.basketExtendList.append(extElem);
    }

    Basket.prototype.render.call(this);
};

ExtendedBasket.prototype.refresh = function () {
    this.basketExtendList.empty();

    Basket.prototype.refresh.call(this);
};

ExtendedBasket.prototype.renderCountAndPrice = function () {
    Basket.prototype.renderCountAndPrice.call(this);

    this.tableTotalPrice.text(this.amount + '.00');
    this.tableSubPrice.text(this.amount + '.00');
};

ExtendedBasket.prototype.clean = function () {
    this.basketItems = [];
    this.refresh();
};

ExtendedBasket.prototype.changeAmount = function (idProduct,newAmount) {

    idProduct = parseInt(idProduct);
    newAmount = parseInt(newAmount);

    if (newAmount < 1)
        return null;

    var elemArr;

    for (var key in this.basketItems) {
        if (parseInt(this.basketItems[key].id) === idProduct) {
            elemArr = key;
            break;
        }
    }

    if (elemArr !== undefined) {
        this.basketItems[elemArr].amount = newAmount;

        var toPay = this.basketItems[elemArr].amount * this.basketItems[elemArr].price;

        this.basketList = $('.cart__product-list');
        this.basketExtendList = $('.basket-table__tbody');

        var basketListItem = this.basketList.find('.cart__product-elem[data-id="' + idProduct + '"]');
        basketListItem.find('.cart__product-amount').text(this.basketItems[elemArr].amount);
        basketListItem.find('span .cart__product-price').text(toPay);

        var basketExtListItem = this.basketExtendList.find('tr[data-id="' + idProduct + '"]');
        basketExtListItem.find('.basket-table__subtotal span').text('$'+toPay);

        this.updateCountAndPrice();
        this.renderCountAndPrice();
    }
};
