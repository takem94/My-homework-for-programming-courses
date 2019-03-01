$(function () {
    var $featuresItems = $('.features-items'),
        ajaxData;
    
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

    var ajaxPromise = new Promise(function (resolve, reject) {
        $.ajax({
            url: 'products.json',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            success: function( data, textStatus, jQxhr ){
                resolve(data);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                reject(errorThrown);
            }
        });
    });

    ajaxPromise.then(function (dataT) {
        ajaxData = dataT;

        for (var i = 0; i < dataT.length; ++i) {
            var data = dataT[i];
            $featuresItems.append(createFeatureItem(data.title,data.price,data.img,'product-preview','#',data.id));
        }
    });

    var $basketList = $('.cart__product-list'),
        $basketTotalPrice = $('.cart__price-value'),
        $basketNotCounter = $('.account-info__cart-counter'),
        $cartBtn = $('.account-info__cart-btn');

    var basket = new Basket(1, $basketList , $basketTotalPrice, $basketNotCounter);

    $featuresItems.on('click',function (e) {
        var target = $(e.target);

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


            basket.add(parseInt(elemID), ajaxData);
        }
    });

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

    $basketNotCounter.bind('DOMSubtreeModified', function () {
        if (parseInt($basketNotCounter.text()) > 0) {
            $basketNotCounter.show();
        } else {
            $basketNotCounter.hide();
        }
    });

});