$(function () {
    var $indexFeaturesItems = $('.features .features-items'),
        $featuresItems = $('.products .features-items'),
        $similarItems = $('.similar .features-items'),
        $basketTable = $('.basket-table'),
        ajaxDataProducts,
        ajaxDataFeatures,
        ajaxDataSimilar;

    function eventAddBasket(ev) {
        var target = $(ev.target);

        if (target.hasClass('features-items__unit-btn')) {
            var elemID = target.parent(),
                stopFlag = false;

            while (!stopFlag) {

                if(target.hasClass('features-items__unit')) {
                    elemID = target.data('id');
                    stopFlag = true;
                    break;
                }
                target = $(target.parent());
            }

            ev.data.basket.add(parseInt(elemID), ev.data.data);
        }
    }

    function createFeatureItem(title,price,img,imgAlt,link,id) {
        var item = $('<div />', { class: 'features-items__unit', 'data-id': id});

        var itemImgWrapp = $('<div />', { class: 'features-items__unit-img'}),
            itemImg = $('<img />', { src: img, alt: imgAlt}),
            itemBtn = $('<button />', { text: 'Add to Cart', class: 'features-items__unit-btn'});

        var itemTitle = $('<div />', { text: title, class: 'features-items__unit-title'}),
            itemPrice = $('<div />', { text: '$'+price+'.00', class: 'features-items__unit-price'}),
            itemLink  = $('<div />', { href: link, class: 'features-items__link-wrapper'});

        item.append(itemImgWrapp.append(itemImg).append(itemBtn)).append(itemTitle).append(itemPrice).append(itemLink);

        return item;
    }

    function ajaxProductsPromise (url) {
        return $.ajax({
            url: url,
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
        });
    }

    var $basketList = $('.cart__product-list'),
        $basketTotalPrice = $('.cart__price-value'),
        $basketNotCounter = $('.account-info__cart-counter'),
        basket;

    if ($basketTable.length > 0) {
        var productTemplate = $('.basket-table_template').remove().clone().removeClass('basket-table_template'),
            basketTableBody = $('.basket-table__tbody'),
            totalSumSubElem = $('.delivery-block__sub-total_value'),
            totalSumElem = $('.delivery-block__grand-total_value');

        basketTableBody.empty();
        basket = new ExtendedBasket(1, $basketList, $basketTotalPrice, $basketNotCounter,basketTableBody,totalSumElem,totalSumSubElem,productTemplate);
    } else {
        basket = new Basket(1, $basketList , $basketTotalPrice, $basketNotCounter);
    }
    //
    // Main code
    //

    // Slick-slider JS
    var $reviewsSlider = $('.reviews-slider'),
        $productSlider = $('.product-slider');

    if ($reviewsSlider.length > 0) {
        $reviewsSlider.slick({
            infinite: true,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 3000,
            draggable: true
        });
    }

    // NoUiSlider
    var slider = document.getElementById('flatSlider');

    if (slider !== null) {
        var snapValues = [
            document.getElementById('flatSliderMinValue'),
            document.getElementById('flatSliderMaxValue')
        ];

        noUiSlider.create(slider, {
            start: [50, 400],
            connect: true,
            step: 1,
            range: {
                'min': 0,
                'max': 600
            }
        });

        slider.noUiSlider.on('update', function(values, handle) {
            snapValues[handle].innerHTML = Math.round(values[handle]);
        });
    }

    //
    // Variables to listen or append
    //

    var selectBtn           = $('.search-form__directory-select'),
        cartBtn             = $('.account-info__cart-btn'),
        cartOverlay         = $('.cart'),
        selectedOption      = $('.search-form__directory-option'),
        dropDownOption      = $('.search-form__dropdown'),
        productsCategory    = $('.products-category'),
        directoryOption     = $('.search-form__directory-unit'),
        mainProduct         = $('section.product');


    //
    // Listeners
    //

    if(productsCategory.length > 0) {

        productsCategory.on('click', function(e) {
            var toggleValue = e.target.parentElement;

            if (toggleValue.dataset.active == 'false' || toggleValue == '') {
                toggleValue.dataset.active = 'true';
                e.target.classList.add('products-category__btn_active');
                e.target.nextElementSibling.style.maxHeight = '500px';
            } else {
                toggleValue.dataset.active = 'false';
                e.target.classList.remove('products-category__btn_active');
                e.target.nextElementSibling.style.maxHeight = '0';
            }

        });
    }

    // Dropdown-menu

    directoryOption.on('click', function(e) {
        e.preventDefault();

        selectedOption.val(e.currentTarget.textContent).change();
        selectedOption.text(e.currentTarget.textContent);
        dropDownOption.hide();

    });

    selectBtn.on('mousedown', function(event) {
        event.preventDefault();

        if (dropDownOption.css('display') === 'none') {
            dropDownOption.show();
        } else {
            dropDownOption.hide();
        }
    });

    // Cart overlay

    cartBtn.on('click', function(event) {
        event.preventDefault();

        if (cartOverlay.css('display') === 'none') {
            cartOverlay.show();
        } else {
            cartOverlay.hide();
        }
    });

    //
    // Lists of products
    //

    // For index page

    if ($indexFeaturesItems.length > 0) {
        ajaxProductsPromise ('./json/featured.json').done(function (dataT) {
            ajaxDataFeatures = dataT;

            for (var i = 0; i < dataT.length; ++i) {
                var data = dataT[i];

                $indexFeaturesItems.append(createFeatureItem(data.title,data.price,data.img,'product-preview','#',data.id));
            }

            $indexFeaturesItems.on('click',{ data: ajaxDataFeatures, basket: basket},eventAddBasket);
        });
    }

    // For product page

    if ($featuresItems.length > 0) {
        ajaxProductsPromise('./json/products.json').done(function (dataT) {
            ajaxDataProducts = dataT;

            for (var i = 0; i < dataT.length; ++i) {
                var data = dataT[i];

                $featuresItems.append(createFeatureItem(data.title,data.price,data.img,'product-preview','#',data.id));
            }

            $featuresItems.on('click',{ data: ajaxDataProducts, basket: basket},eventAddBasket);
        });
    }

    // For single page

    if ($similarItems.length > 0) {
        ajaxProductsPromise('./json/single-page.json').done(function (dataT) {
            ajaxDataSimilar = dataT;

            for (var i = 0; i < dataT.length; ++i) {
                var data = dataT[i];

                $similarItems.append(createFeatureItem(data.title,data.price,data.img,'product-preview','#',data.id));
            }

            $similarItems.on('click',{ data: ajaxDataSimilar, basket: basket},eventAddBasket);
        });
    }

    // For cart page

    if ($basketTable.length > 0) {

        // If user want to clean basket.
        $('.basket-controls__btn_del').on('click', function () {
           basket.clean();
        });

        // If user want to change count of good.
        basketTableBody.on('input',function (event) {

            if (event.target.classList.contains('basket-table__quantity-input')) {

                if(event.target.value < 1)
                    event.target.value = 1;

                var target = $(event.target.parentNode.parentNode);

                if (target.hasClass('basket-table__elem')) {
                    var elemID = target.data('id');

                    basket.changeAmount(elemID, event.target.value);
                }
            }
        });

        // If user want to delete elem form extended basket.
        basketTableBody.on('click', function (e) {
            var target = $(e.target),
                className = 'basket-table__btn-del';

            if (target.hasClass(className) || $(target.parent()).hasClass(className)) {
                var elemID, stopFlag = false;

                while (!stopFlag) {

                    if(target.hasClass('basket-table__elem')) {
                        elemID = target.data('id');
                        stopFlag = true;
                        break;
                    }
                    target = $(target.parent());
                }

                basket.remove(parseInt(elemID));
            }
        });
    }

    // For single product

    if (mainProduct.length > 0) {
        ajaxProductsPromise('./json/single-page-product.json').done(function (dataT) {
            dataT = dataT[0];

            for (var key in dataT.desc.slides) {
                var slide = $('<div />', {class: 'product-slider__slide'}),
                    slideWrap = $('<div />', {class: 'product-slider__slide-img'}),
                    slideImg = $('<img />', {src: dataT.desc.slides[key], alt: 'product'});

                slide.append(slideWrap.append(slideImg));

                $productSlider.append(slide);
            }

            var $images = $('.product-slider img'),
                loadedImages = 0,
                totalImages = $images.length;

            $images.on('load',function () {
                ++loadedImages;

                if (loadedImages === totalImages){
                    $productSlider.slick({
                        infinite: true,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        draggable: true
                    });
                }
            });

            $('.product-overview').data('id',dataT.id);
            $('.product-overview__collection-name').text(dataT.desc.collection);
            $('.product-overview__title').text(dataT.title);
            $('.product-overview__description').text(dataT.desc.text);
            $('.product-overview__info-material-value').text(dataT.desc.material);
            $('.product-overview__info-designer-value').text(dataT.desc.designer);
            $('.product-overview__price').text('$'+dataT.price+'.00');

            var $productForm = $('#productForm');

            $productForm.on('submit', function (e) {
                e.preventDefault();
                
                var formSize = $('#productSize'),
                    formColor = $('#productColor'),
                    formCount = $('#productCount');
                
                dataT.amount = parseInt(formCount.val());
                dataT.size = formSize.val();
                dataT.color = formColor.val();

                basket.add(dataT.id,[dataT]);
            });
        });
    }

    // If user want to delete element from basket.

    $basketList.on('click', function (e) {
        var target = $(e.target),
            className = 'cart__product-btn-del';

        if (target.hasClass(className) || $(target.parent()).hasClass(className)) {
            var elemID = target.parent(),
                stopFlag = false;

            while (!stopFlag) {

                if(target.hasClass('cart__product-elem')) {
                    elemID = target.data('id');
                    stopFlag = true;
                    break;
                }
                target = $(target.parent());
            }

            basket.remove(parseInt(elemID));
        }
    });
});
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

        this.basketList.append(elem);
    }

    this.updateCountAndPrice();
    this.renderCountAndPrice();

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
        url: './json/basket.json',
        dataType: 'json',
        context: this,
        success: function (data) {
            this.basketItems = data;
            this.refresh();
        }
    });
};

Basket.prototype.add = function (idProduct, ajaxData) {
    var flagToAdd = false;
    var arrayKey;

    idProduct = parseInt(idProduct);

    for (var key in ajaxData) {
        if (parseInt(ajaxData[key].id) === idProduct) {
            arrayKey = key;
            break;
        }
    }

    for (var key in this.basketItems) {

        if (idProduct === parseInt(this.basketItems[key].id)) {
            flagToAdd = true;

            if (ajaxData[arrayKey].amount > 1) {
                this.basketItems[key].amount += parseInt(ajaxData[arrayKey].amount);
                this.countGoods += ajaxData[arrayKey].amount;
            } else {
                ++this.basketItems[key].amount;
                ++this.countGoods;
            }
            break;
        }
    }

    if (!flagToAdd) {

        if(ajaxData[arrayKey].amount === undefined)
            ajaxData[arrayKey].amount = 1;
        // Clone needed to except collision with increment amount.
        var cloneData = JSON.parse(JSON.stringify(ajaxData[arrayKey]));
        this.basketItems.push(cloneData);
    }

    this.refresh(); //Перерисовываем корзину
};

Basket.prototype.refresh = function () {
    this.basketList.empty();
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

Basket.prototype.updateCountAndPrice = function () {
    this.amount = 0;
    this.countGoods = 0;

    for(var key in this.basketItems) {
        var elem = this.basketItems[key];

        this.countGoods += parseInt(elem.amount);
        this.amount += parseInt(elem.amount) * parseInt(elem.price);
    }
};

Basket.prototype.renderCountAndPrice = function () {
    if (this.countGoods > 0) {
        this.basketNotCounter.text(this.countGoods);
        this.basketNotCounter.show();
    } else {
        this.basketNotCounter.hide();
    }

    this.basketTotalPrice.text('$' + this.amount + '.00');
};

function Container(id) {
    this.id = id;
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

//TODO: ДЗ
Container.prototype.remove = function () {

};
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

function Good(id, title, price) {
    Container.call(this, id);
    this.title = title;
    this.price = price;
}

Good.prototype = Object.create(Container.prototype);
Good.prototype.constructor = Good;

Good.prototype.render = function (jQuerySelector) {
    var $goodContainer = $('<div />', {
        class: 'good'
    });

    var $goodTitle = $('<p />', {
        text: this.title
    });

    var $goodPrice = $('<p>Цена: <span class="product-price">' + this.price + '</span> руб.</p>');

    var $goodBtn = $('<button />', {
        class: 'buy_good',
        'data-id': this.id,
        text: 'Купить'
    });

    //Создаем иерархию элементов
    $goodTitle.appendTo($goodContainer);
    $goodPrice.appendTo($goodContainer);
    $goodBtn.appendTo($goodContainer);

    jQuerySelector.append($goodContainer);
};