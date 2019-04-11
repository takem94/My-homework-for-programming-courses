"use strict";

/*
    Урок 4. Объекты в JavaScript
    1. Написать функцию, преобразующую число в объект

    * Передавая на вход число от 0 до 999, мы должны получить на выходе объект, в котором в соответствующих 
    * свойствах описаны единицы, десятки и сотни. 
    * Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
    * Если число превышает 999, необходимо выдать соответствующее сообщение с помощью `console.log` и вернуть пустой объект.
*/

(function(){
    console.log('Решение для задания под номером 1');

    var deNumberator = function (num){
        var objectWithNumbers = {};

        if (num >= 0 && num <= 999) {
            var tempStr = (num+'').split('').reverse().join('');

            for (var key in tempStr){
                if (key == 0)
                    objectWithNumbers['единицы'] = tempStr[key];
                else if (key == 1)
                    objectWithNumbers['десятки'] = tempStr[key];
                else if (key == 2) 
                    objectWithNumbers['сотни'] = tempStr[key];
            }
            return objectWithNumbers;
        } else {
            console.log('Превышание доступного диапозона. (0...999)')
            return null;
        }
    }

    console.log(deNumberator(2));
    console.log(deNumberator(24));
    console.log(deNumberator(245));
})();


/*
    2. * Выписать сделанные пользователем ходы в массив и вывести их по окончании игры
    Используйте файл 'practice.js'
*/

(function(){
    var game = {
        count: 0,
        steps: [],
        gameIsRunning: true,
        random: function(min, max) {
            return Math.round(min + Math.random() * (max - min));
        },
        checkAnswer: function(random) {
            var answer = +prompt('Укажите число (-1 – закончить игру)');

            while(this.gameIsRunning) {
                if(answer === -1) {
                    this.gameIsRunning = false;
                } else if (answer == 0 && isNaN(answer)) {
                    alert('Вы не ввели число!\nВыход.');
                    this.gameIsRunning = false;
                } else if (answer == random) {
                    alert('Поздравляем, вы угадали число!');
                    this.steps.push(answer);
                    this.gameIsRunning = false;
                } else {
                    this.count++;
                    this.steps.push(answer);
                    answer = +prompt('Не угадали.\nУкажите другое чило(-1 – закончить игру)\nПопыток:' + this.count);
                }
            }
            if (this.steps.length > 0) {
                for(var key in this.steps){
                    console.log('Шаг номер №' + (parseInt(key)+1) + '.\nВаш ответ:' + this.steps[key]);
                }
            }
        }
    };

    game.checkAnswer(game.random(1, 3));
})();


