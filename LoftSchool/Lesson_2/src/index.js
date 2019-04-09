/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

    if (array.length < 1 || !(array instanceof Array)) {
        throw new Error('empty array');
    } else if (!(fn instanceof Function)) {
        throw new Error('fn is not a function');
    }

    let counter = 0;

    for (let key in array) {
        if (fn(array[key])) {
            counter++;
        }
    }

    return (counter === array.length);
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

    if (array.length < 1 || !(array instanceof Array)) {
        throw new Error('empty array');
    } else if (!(fn instanceof Function)) {
        throw new Error('fn is not a function');
    }

    let result = false;

    for (let key in array) {
        if (fn(array[key])) {
            result = true;
            break;
        }
    }

    return result;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

    if (!(fn instanceof Function)) {
        throw new Error('fn is not a function');
    }

    let result = [];

    for (let key in arguments) {

        if (arguments[key] !== fn) {
            try {
                fn(arguments[key]);
            } catch (e) {
                result.push(arguments[key]);
            }
        }
    }

    return result;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number) {

    number = number || 0;

    if (isNaN((number + 1))) {
        throw new Error('number is not a number');
    }

    function calculateTemplate(operator) {

        return function () {

            for (let key in arguments) {
                switch (operator) {
                    case '/':
                        if (arguments[key] === 0) {
                            throw new Error('division by 0');
                        }
                        number /= arguments[key];
                        break;
                    case '*':
                        number *= arguments[key];
                        break;
                    case '-':
                        number -= arguments[key];
                        break;
                    case '+':
                        number += arguments[key];
                        break;
                }
            }

            return number;
        }
    }

    let result = {};

    result.sum = function () {
        return calculateTemplate('+')(arguments);
    };

    result.div = function () {
        return calculateTemplate('/')(arguments);
    };

    result.dif = function () {
        return calculateTemplate('-')(arguments);
    };

    result.mul = function () {
        return calculateTemplate('*')(arguments);
    };

    return result;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
