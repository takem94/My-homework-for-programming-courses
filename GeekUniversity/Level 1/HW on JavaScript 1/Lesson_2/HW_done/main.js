"use strict";
/*
    Урок 2. Основные операторы JavaScript
*/

/*
    1    Почему код даёт именно такие результаты?
        var a = 1, b = 1, c, d;
        c = ++a; alert(c); // 2

        // При преинкременте значение сначала увеливается на +1, а затем присваивается переменной. 
        // В данном случае и переменная "а" стала равна 2.

        d = b++; alert(d); // 1

        // При постинкременте значение сначала присваивается переменной, а затем увеливается на +1.
        // В данном случае, присвоилось значение 1, но переменная "b" стала равна 2.

        c = (2+ ++a); alert(c); // 5

        // Тоже самое, мы инкрементировали перменную и сложили с константным литералом. "a" было = 2.

        d = (2+ b++); alert(d); // 4

        // Мы сначала сложили перменную с константным литералом, а затем после этого операнда увеличили b. 
        // "b" было = 2, на момент присвоения, а после этого увеличилось.

        alert(a); // 3
        alert(b); // 3

        // В конечном счете, переменные были одинаковое кол-во раз инкрементированы и их значения равны, как и при 
        // инициализации. 
*/

/*
    2    Чему будет равен x в примере ниже?

        var a = 2;
        var x = 1 + (a *= 2);

        Ответ: В данном случае, "x" = 5, а "а" = 4. Все дело в сокращенной операции присвоения с умножением. 
*/

/*
    3    Объявить две целочисленные переменные a и b и задать им произвольные начальные значения.
        Затем написать скрипт, который работает по следующему принципу:
            если a и b положительные, вывести их разность;
            если а и b отрицательные, вывести их произведение;
            если а и b разных знаков, вывести их сумму; (ноль можно считать положительным числом)
*/

(function (){
    var elemBtn = document.getElementById('get-result');

    elemBtn.onclick = function () {
        var elemA = document.getElementById('var-a');
        var elemB = document.getElementById('var-b');
        var elemOut = document.getElementById('ex-output');

        var a = parseInt(elemA.value);
        var b =  parseInt(elemB.value);

        if(!isNaN(a) && !isNaN(b)){
            var res;

            if(a >= 0 && b >= 0){
                res = a - b;
                res < 0 ? res *= -1 : res *= 1;
            } else if (a < 0 && b < 0) 
                res = a * b;
            else 
                res = a + b;
            
            elemOut.innerHTML = '\n<b>Результат:</b> ' + res;
        }
    };
})();

/*
    4    Присвоить переменной а значение в промежутке [0..15].
        С помощью оператора switch организовать вывод чисел от a до 15.
*/

(function(){
    var elemOtherA = document.getElementById('var-other-a');
    // Не очень логичное задание, больше подходит для циклов, чем для switch. Получилось много копипасты, либо я 
    // что-то неправильно понял. 
    elemOtherA.onkeyup = function g() {
        var valueOfA = parseInt(this.value);
        var listOfA = document.getElementById('list-of-a');

        if (!isNaN(valueOfA) && valueOfA > 15) {
            this.value = 15;
            valueOfA = 15;
        } else if (!isNaN(valueOfA) && valueOfA < 0){
            this.value = 0;
            valueOfA = 0;
        }    

        if (!isNaN(valueOfA)) {
            listOfA.innerHTML = '';
            var elemLi;
            switch (valueOfA) {
                case 0:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '0';
                    listOfA.appendChild(elemLi);
                case 1:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '1';
                    listOfA.appendChild(elemLi);
                case 2:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '2';
                    listOfA.appendChild(elemLi);
                case 3:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '3';
                    listOfA.appendChild(elemLi);
                case 4:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '4';
                    listOfA.appendChild(elemLi);
                case 5:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '5';
                    listOfA.appendChild(elemLi);
                case 6:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '6';
                    listOfA.appendChild(elemLi);
                case 7:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '7';
                    listOfA.appendChild(elemLi);
                case 8:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '8';
                    listOfA.appendChild(elemLi);
                case 9:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '9';
                    listOfA.appendChild(elemLi);
                case 10:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '10';
                    listOfA.appendChild(elemLi);
                case 11:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '11';
                    listOfA.appendChild(elemLi);
                case 12:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '12';
                    listOfA.appendChild(elemLi);
                case 13:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '13';
                    listOfA.appendChild(elemLi);
                case 14:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '14';
                    listOfA.appendChild(elemLi);
                case 15:
                    elemLi = document.createElement('li');
                    elemLi.innerHTML = '15';
                    listOfA.appendChild(elemLi);
            }
        };
    };
})();

/*
    5    Реализовать основные 4 арифметические операции в виде функций с двумя параметрами.
    Обязательно использовать оператор return.
*/

function Plus(a, b) {
    a === undefined || isNaN(a) ? a = 0 : a = a;
    b === undefined || isNaN(b) ? b = 0 : b = b;

    return a + b;
}

function Minus(a, b) {
    a === undefined || isNaN(a) ? a = 0 : a = a;
    b === undefined || isNaN(b) ? b = 0 : b = b;

    return a - b;
}

function Multiply(a, b) {
    a === undefined || isNaN(a) ? a = 0 : a = a;
    b === undefined || isNaN(b) ? b = 0 : b = b;

    return a * b;
}

function Divide(a, b) {
    a == undefined || isNaN(a) ? a = 0 : a = a;
    b == undefined || isNaN(b) ? b = 0 : b = b;

    if (b == 0) {
        return 'Деление на ноль!';
    }

    return a / b;
}

(function(){
    var ex5Btn = document.getElementById('ex5-btn');

    ex5Btn.onclick = function () {
        var leftOperand = parseInt(document.getElementById('ex5-var-other-a').value);
        var rightOperand = parseInt(document.getElementById('ex5-var-other-b').value);
        var doOperation =  document.getElementById('ex5-operation').value;
        var ex5Output = document.getElementById('ex5-ohter-output');
        var ex5Res;

        if (!isNaN(leftOperand) && !isNaN(rightOperand) ) {
            switch (doOperation) {
                case 'Plus': 
                    ex5Res = Plus(leftOperand, rightOperand);
                    break;
                case 'Minus': 
                    ex5Res = Minus(leftOperand, rightOperand);
                    break;
                case 'Multiply': 
                    ex5Res = Multiply(leftOperand, rightOperand);
                    break;
                case 'Divide':
                    ex5Res = Divide(leftOperand, rightOperand);
                    break;
                default:
                    ex5Res = 'Ошибка, неверная операция.';
            };
        }
        ex5Output.innerHTML = '\n<p><b> Результат:</b>'+ ex5Res +'</p>';
    };
})();

/*
    6    Реализовать функцию с тремя параметрами:
        function mathOperation(arg1, arg2, operation)
        где arg1, arg2 – значения аргументов, operation – строка с названием операции.
        В зависимости от переданного значения операции выполнить одну из арифметических операций 
        (использовать функции из пункта 3) и вернуть полученное значение (использовать switch).
*/

function mathOperation(arg1, arg2, operation) {
    var ex6Res;

    switch (operation) {
        case 'Plus': 
            ex6Res = Plus(arg1, arg2);
            break;
        case 'Minus': 
            ex6Res = Minus(arg1, arg2);
            break;
        case 'Multiply': 
            ex6Res = Multiply(arg1, arg2);
            break;
        case 'Divide':
            ex6Res = Divide(arg1, arg2);
            break;
        default:
            ex6Res = 'Ошибка, неверная операция.';
    };
    return ex6Res;
}

(function(){
    var ex6Btn = document.getElementById('ex6-btn');

    ex6Btn.onclick = function () {
        var arg1 = parseInt(document.getElementById('ex6-var-other-a').value);
        var arg2 = parseInt(document.getElementById('ex6-var-other-b').value);
        var someOperation =  document.getElementById('ex6-operation').value;
        var ex6Output = document.getElementById('ex6-ohter-output');

        if (!isNaN(arg1) && !isNaN(arg2)) {
            ex6Output.innerHTML = '\n<p><b> Результат:</b>'+ mathOperation(arg1,arg2,someOperation) +'</p>';
        }
    }
})();

/*
    7*. Сравнить null и 0. Попробуйте объяснить результат.
*/
    console.log(null == 0);         // False
    console.log(null > 0);          // False
    console.log(null >= 0);         // True
    console.log(null == undefined); // True
/*
    Ответ: При сравнении, результат будет false. Это одна из философских особенностей Js. Такое поведение при 
    сравнении происходит потому, что во внутренней реализации алгоритма сравнения не предусмотрено сравнение данных
    типов. По умолчанию, если при сравнении не было найдено ни одного совпадения по приведению и сравнению, 
    алгоритм выдает false. Более интересным является сравнение с испоьзованием операнда ">=", которое выдает true.
*/

/*
    8*. С помощью рекурсии организовать функцию факториала.
    Факторииал числа – это число, умноженное на «себя минус один», затем на «себя минус два» и так далее, до единицы. Обозначается n!
    n! = n * (n - 1) * (n - 2) * ...*1
*/

var factorial = function (f){
    if (f == 0 || f == 1)
        return 1;
    else if (f < 0)
        f *= -1;
    return f * factorial(f-1);
};

(function(){
    var ex8Btn = document.getElementById('ex8-btn');

    ex8Btn.onclick = function () {
        var ex8Arg = parseInt(document.getElementById('ex8-var-other-a').value);
        var ex8Output = document.getElementById('ex8-other-output');

        if (!isNaN(ex8Arg) && ex8Arg <= 21){
            ex8Output.innerHTML = '\n<p><b> Результат:</b>' + factorial(ex8Arg) + '</p>';
        }
    }
})();
