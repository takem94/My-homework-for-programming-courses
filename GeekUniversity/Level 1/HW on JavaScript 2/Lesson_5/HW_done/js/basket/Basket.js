function Basket(idBasket,$basketList,$basketTotalPrice,$basketNotCounter) {
    Container.call(this, idBasket);

    this.countGoods = 0; //Общее количество товаров
    this.amount = 0; //Общая стоимость товаров
    this.basketItems = []; //Массив для хранения товаров

    this.basketList = $basketList;
    this.basketTotalPrice = $basketTotalPrice;
    this.basketNotCounter = $basketNotCounter;

    //Получаем все товары, при созаднии корзины
    this.loadBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function () {

    for (var key in this.basketItems) {
        var eArr = this.basketItems[key],
            elem = this.createElem('#', eArr.img, 'Preview', eArr.title, eArr.rating, eArr.amount, eArr.price, eArr.id);

        this.amount += (parseInt(this.basketItems[key].price) * parseInt(this.basketItems[key].amount));
        this.countGoods += parseInt(this.basketItems[key].amount);

        this.basketList.append(elem);
    }

    this.basketTotalPrice.text('$' + this.amount + '.00');
    this.basketNotCounter.text(this.countGoods);
};

Basket.prototype.createElem = function (link, img, altImg, title, rate, amount, price, id) {
    var elem = $('<div />', { class: 'cart__product-elem', 'data-id': id});

    var elemPreview = $('<div />', { class: 'cart__product-preview'}),
        elemPreviewLink = $('<a />', { href: link}),
        elemPreviewImg = $('<img />', { src: img, alt: altImg});

    var elemInfo = $('<div />', { class: 'cart__product-info'}),
        elemInfoTitle = $('<a />', { class: 'cart__product-title', href: link, text: title});

    var elemInfoRate = $('<div />', { class: 'cart__product-rate'});

    var elemInfoPrice = $('<p />', { class: 'cart__product-price'}),
        elemInfoAmount = $('<span />', { class: 'cart__product-amount', text: amount}),
        elemInfoPriceVal = $('<span />', { class: 'cart__product-price', text: ('$' + price + '.00')});

    var elemBtnDel = $('<button />', { class: 'cart__product-btn-del'}),
        elemBtnIcon = $('<i />', { class: 'fa fa-times'});

    rate = parseFloat(rate);

    for (var i = 4; i >= 0; --i) {
        var star;

        if(rate >= 1){
            star = $('<i />', { class: 'fa fa-star'});
            --rate;
        } else if ( rate > 0) {
            star = $('<i />', { class: 'fas fa-star-half-alt'});
            --rate;
        } else {
            star = $('<i />', { class: 'far fa-star'});
        }
        elemInfoRate.append(star);
    }

    elem.append(elemPreview.append(elemPreviewLink.append(elemPreviewImg)));
    elemInfoPrice.append(elemInfoAmount).append(' x ').append(elemInfoPriceVal);
    elem.append(elemInfo.append(elemInfoTitle).append(elemInfoRate).append(elemInfoPrice));
    elemBtnDel.append(elemBtnIcon);
    elem.append(elemBtnDel);

    return elem;
};

/**
 * Метод получения/загрузки товаров
 */
Basket.prototype.loadBasketItems = function () {
    $.get({
        url: 'basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            this.basketItems = data;
            this.refresh();
        }
    });
};

Basket.prototype.add = function (idProduct, ajaxData) {
    ++this.countGoods;

    var flagToAdd = false;

    for (var key in this.basketItems) {

        if (idProduct === parseInt(this.basketItems[key].id)) {
            flagToAdd = true;
            ++this.basketItems[key].amount;
            break;
        }
    }

    if (!flagToAdd) {
        ajaxData[idProduct-1].amount = 1;
        this.basketItems.push(ajaxData[idProduct-1]);
    }

    this.refresh(); //Перерисовываем корзину
};

Basket.prototype.refresh = function () {
    this.basketList.empty();
    this.amount = 0;
    this.countGoods = 0;
    this.render();
};

Basket.prototype.remove = function (id) {

    for(var key in this.basketItems) {

        if (id === parseInt(this.basketItems[key].id)) {
            this.basketItems.splice(key,1);
            break;
        }
    }

    this.refresh();
};