"use strict";

/*
Урок 6. Обработка событий в JavaScript
1. Проверять src картинки

    – Доработать функцию замены картинки в галерее таким образом, чтобы она проверяла наличие картинки 
    по указанному в src адресу
*/

(function (){

    // Это ужасное решение, кторое я оставил только для поддержания историчности.

    function init() {
        var slider = document.querySelectorAll('.slider__img');
        var appDiv = document.querySelector('.show-full-img');
        var btnNext = document.querySelector('.next-btn');
        var btnPrevious = document.querySelector('.prev-btn');
        var bigImage = document.createElement('img');
        var active = {
            numOfElem: null,
            elem: null
        };
        
        bigImage.src = ' ';
        appDiv.appendChild(bigImage);

        bigImage.addEventListener('error', function (e){
            e.target.src = slider[0].src;
            slider[0].style.border = '2px solid blue';
            active.elem = slider[0];
            active.numOfElem = 0;
        });

        slider.forEach (function (e) {
            e.addEventListener('click',changeBigPicture);
        });

        btnNext.addEventListener('click',changeNext);
        btnPrevious.addEventListener('click',changePrevious);

        function changeBigPicture (event) {
            var smallImg = event.target;
            var srcArr = smallImg.src.split('/');
            var smallImgName = srcArr[srcArr.length -1];
            var bigImgScr = 'img/big/' + smallImgName;
            
            active.elem.style.border = '';
            smallImg.style.border = '4px solid blue';
            
            for (var key = 0; key < slider.length-1; ++key) {
                if(slider[key].src === smallImg.src)
                    active.numOfElem = key;
            }
            bigImage.src = bigImgScr;
            active.elem = smallImg;
        }

        function changePrevious () {
            active.elem.style.border = '';
            if(active.numOfElem - 1 < 0){
                slider[slider.length - 1].style.border = '4px solid blue';
                active.elem = slider[slider.length - 1];
                active.numOfElem = slider.length - 1;
            } else {
                slider[--active.numOfElem].style.border = '4px solid blue';
                active.elem = slider[active.numOfElem];
            }
            bigImage.src = active.elem.src;
        }

        function changeNext () {
            active.elem.style.border = '';
            if(active.numOfElem + 1 > slider.length - 1){
                slider[0].style.border = '4px solid blue';
                active.elem = slider[0];
                active.numOfElem = 0;
            } else {
                slider[++active.numOfElem].style.border = '4px solid blue';
                active.elem = slider[active.numOfElem];
            }
            bigImage.src = active.elem.src;
        }
    }
    
    window.addEventListener('load',init);
})();

/*
2. Реализовать модуль корзины

    – создать блок товаров и блок корзины
    – у каждого товара есть кнопка «Купить», при нажатии на которую происходит добавление имени и цены товара в блок корзины.
    – корзина должна уметь считать общую сумму заказа

3. * Добавить функцию перехода к следующему изображению

    – добавить в галерею функцию перехода к следующему изображению
    – по сторонам от большой картинки должны быть стрелки “вперед” и “назад”
    – по нажатию происходит замена изображения на следующее или предыдущее

*/