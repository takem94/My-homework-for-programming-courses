"use strict";
/*
    Урок 3. Циклы, массивы, структуры данных

    1    С помощью цикла while вывести все простые числа в промежутке от 0 до 100
        Что такое простые числа: https://ru.wikipedia.org/wiki/%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE
*/

(function(){
    console.log('Решение задания для номера 1');

    var i = 0;
        // Не очень красивое решение, без применения функций, как и просилось в задании. 
    while(i <= 100) {
        var j = 2, counter = 0;

        while(j <= i) {
            if (i % j === 0 )
                ++counter;
            ++j;
        }

        if (counter === 1) 
            console.log(i);

        ++i;
    }
})();

        // Второе решение, которое было рассмотрено в уроке номер 4. 

function isPrime (number) {
    if (number < 2) 
        return false;
    
    var i = 2;

    while (number < i){
        if (i % j === 0 )
            return false;
        ++i;
    }
    return true;
}

function getAllPrime (max) {
    var i = 0, primeArray = [];

    while (i < max) {
        if(isPrime(i)){
            console.log(i);
            primeArray.push(i);
        }
        ++i;
    }
}

// getAllPrime(100);

/*
    2    С помощью цикла do…while написать функцию для вывода чисел от 0 до 10, чтобы результат выглядел так:

        0 – это ноль
        1 – нечетное число
        2 – четное число
        3 – нечетное число
        …
        10 – четное число
*/
(function(){
    console.log('Решение задания для номера 2');

    var i = 0;

    do {
        if (i % 2) {
            console.log(i +' - это нечетное число');
        } else if (i == 0){
            console.log(i +' - это ноль');
        } else {
            console.log(i + ' - это четное число');
        }
        ++i;
    } while (i <= 10);
})();

/*
        3*. Вывести с помощью цикла for числа от 0 до 9, НЕ используя тело цикла. То есть выглядеть должно вот так:

        for(…){// здесь пусто}
*/
(function(){
    console.log('Решение задания для номера 3');

    for (var i = 0; i < 10;  console.log(i++)) {}
})();

/*
        4*. Нарисовать пирамиду с помощью console.log, как показано на рисунке, только у вашей пирамиды должно быть 20 рядов, а не 5:

        x
        xx
        xxx
        xxxx
        xxxxx

*/

(function(){
    console.log('Решение задания для номера 4');

    for (var h = 0, pyramid = ''; h < 20; ++h) {
        console.log( (pyramid += 'x') );
    }
})()