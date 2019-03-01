"use strict";

/*
Урок 6. Обработка событий в JavaScript
1. Проверять src картинки

    – Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие картинки 
    по указанному в src адресу

3. * Добавить функцию перехода к следующему изображению

    – добавить в галерею функцию перехода к следующему изображению
    – по сторонам от большой картинки должны быть стрелки “вперед” и “назад”
    – по нажатию происходит замена изображения на следующее или предыдущее

*/
(function (){

    // Проблема этой реализации, заключается в том, что здесь используется костыльная система подмена пути,
    // где за основу берется путь изображения маленького, а потом разбирается и подменяется на большое.
    // С моей точки зрения, лучше было бы сделать заранее ассоциативный массив, где можно было со 100% увереностью
    // подставлять заранее известно рабочие пути. 

    // Еще неприятно, что приходится выносить и использовать множество глобальных перменных, но иначе бы 
    // внутри каждого события была бы сложная логика по поиску нужных элементов.

    function init() {
        var slider = document.querySelectorAll('.slider__img');
        var btnNext = document.querySelector('.next-btn');
        var btnPrevious = document.querySelector('.prev-btn');
        var bigPreview = document.createElement('img');

        var active = {
            smallImg: null, // Эта реализация выглядет довольно странно, но я решил сделать как-бы контроллер,
            bigImg: null    // который бы позволил управлять элементами более автономно и надежно.
        }

        bigPreview.src = '\0'; // Специально создаем ошибку.
        document.querySelector('.show-full-img').appendChild(bigPreview);

        var errCounter = 0;
        bigPreview.addEventListener('error', function (e){ // Та самая проверка. 
            if (errCounter++ > 1) {                             // Проверяем на кол-во ошибок, чтобы избжать зацикливания.
                bigPreview.src = slider[0].src;                 // Если их было больше чем одна, то меняем путь на маленькое изоброжение.
            } else {                                             
                bigPreview.src = changeToBigSrc(slider[0].src); // Если их было меньше, то просто присваиваем первое изоброжение в коллекции, в большом размере.
            }
    
            slider[0].style.border = '4px solid blue';  // Делаем обводку активного элемента.
                                                        // Пока это одна строчка, но когда стилей будет больше,
                                                        // надо будет уже работать с классами.
            active.smallImg = slider[0];
            active.bigImg = bigPreview;
        });

        slider.forEach (function (e) {
            e.addEventListener('click',changeBigPicture);   // Вешаем оброботчик на каждую картинку.
        });

        btnNext.addEventListener('click',changeNext); // Те самые слайдеры. 
        btnPrevious.addEventListener('click',changePrevious); 

        function changeBigPicture (event) {
            var smallImg = event.target;
            
            active.smallImg.style.border = '';
            smallImg.style.border = '4px solid blue';
            
            active.bigImg.src = changeToBigSrc(smallImg.src);
            active.smallImg = smallImg;
        }

        function changeToBigSrc (original) {
            var srcArr = original.split('/');
            var smallImgName = srcArr[srcArr.length -1];
            return 'img/big/' + smallImgName;
        }

        function changePrevious () {
            active.smallImg.style.border = '';
            if (active.smallImg.previousElementSibling) {
                active.smallImg.previousElementSibling.style.border = '4px solid blue';
                active.smallImg = active.smallImg.previousElementSibling;
                active.bigImg.src = changeToBigSrc(active.smallImg.src);
            } else {
                active.smallImg = slider[slider.length - 1];
                active.smallImg.style.border = '4px solid blue';
                active.bigImg.src = changeToBigSrc(active.smallImg.src);
            }
        }

        function changeNext () {
            active.smallImg.style.border = '';
            if (active.smallImg.nextElementSibling) {
                active.smallImg.nextElementSibling.style.border = '4px solid blue';
                active.smallImg = active.smallImg.nextElementSibling;
                active.bigImg.src = changeToBigSrc(active.smallImg.src);
            } else {
                active.smallImg = slider[0];
                active.smallImg.style.border = '4px solid blue';
                active.bigImg.src = changeToBigSrc(active.smallImg.src);
            }
        }
    }
    
    window.addEventListener('load',init);
})();

/*
2. Реализовать модуль корзины

    – создать блок товаров и блок корзины
    – у каждого товара есть кнопка «Купить», при нажатии на которую происходит добавление имени и цены товара в блок корзины.
    – корзина должна уметь считать общую сумму заказа

*/

(function(){
    function init(){
        var btnToCart = document.querySelectorAll('.goods__cart');
        var cart = document.querySelector('.cart');
        var cartList = document.querySelector('.item-list');

        btnToCart.forEach(function (e) {
            e.addEventListener('click',addToCart);
        });

        function addToCart(e) {
            if (cart.style.display === '') {
                cart.style.display = 'block';
            }

            var itemName = e.target.dataset.name;
            var itemPrice = parseInt(e.target.dataset.price);
            var newCartElem = document.createElement('li');
            var sum = document.querySelector('.sum span');

            if (sum) {
                sum.innerHTML = parseInt(sum.innerHTML) + parseInt(itemPrice);
            } else {
                sum = document.createElement('span');
                sum.innerHTML = itemPrice;
                document.querySelector('.sum').appendChild(sum);
            }

            newCartElem.innerHTML = itemName + ' - ' + itemPrice + '$';
            cartList.appendChild(newCartElem);
        }
    }

    window.addEventListener('load',init);
})();

