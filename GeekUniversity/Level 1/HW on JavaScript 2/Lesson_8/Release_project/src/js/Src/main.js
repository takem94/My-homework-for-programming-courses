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