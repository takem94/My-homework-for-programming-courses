"use strict";

/* Урок 5. Введение в DOM */

/*
1.Создать функцию, генерирующую шахматную доску

    можно использовать любые html-теги
    доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки
    строки должны нумероваться числами от 1 до 8
    столбцы латинскими буквами A, B, C, D, E, F, G, H
*/

(function (){
    
    var chessGenerator = function () {
        var divTableChess = document.createElement('div');
        var tableTableChess = document.createElement('table');
        var counter = 1, toggler = false, alphabet = 'A'.charCodeAt(0), size = 9;  

        tableTableChess.align = 'center';
        divTableChess.classList.add('table-chess');
        divTableChess.appendChild(tableTableChess);

        for(var i = 0; i < size; ++i){
            var trTableChess = document.createElement('tr');

            for (var j = 0; j < size; ++j){
                if (i === 0) {
                    var thTableChess = document.createElement('th');

                    if(j !== 0 && j < 27) {
                        thTableChess.innerHTML = String.fromCharCode(alphabet++);
                    }
                    
                    // Костыльная реализация размеров ячеек, т.к. приходится объявлять для каждого элемента, 
                    // еще и два раза в коде. 

                    thTableChess.style.width = '50px';
                    thTableChess.style.height = '50px';

                    trTableChess.appendChild(thTableChess);
                } else {
                    var tdTableChess = document.createElement('td');

                    if (j === 0){
                        tdTableChess.innerHTML = '<b>'+(counter++)+'</b>';
                        tdTableChess.align = 'center';
                    } else {
                       
                        // Не самый оптимальный вариант, на мой взгляд, по закрашиванию клеток, но лучше 
                        // пока не смог представить. Я исходил из того, что бы не было мат. операций при 
                        // вычеслении ячейки.

                        if (toggler) {
                            tdTableChess.style.backgroundColor = '#673d25d6';
                            if (j != size - 1)
                                toggler = false;
                        } else {
                            tdTableChess.style.backgroundColor = 'white';
                            if (j != size - 1)
                                toggler = true;
                        }

                        tdTableChess.style.width = '50px';
                        tdTableChess.style.height = '50px'
                    };

                    trTableChess.appendChild(tdTableChess);
                }
            }

            tableTableChess.appendChild(trTableChess);
        }

        document.querySelector('body').appendChild(divTableChess);
    };

    var btn = document.createElement('button');
    btn.classList.add('create-button');
    btn.innerHTML = 'Создать поле';
    document.querySelector('body').appendChild(btn);

    btn.onclick = function () {
        var isTableExist = document.querySelector('.table-chess');

        if (isTableExist) {
            isTableExist.remove();
            chessGenerator();
        } else {
            chessGenerator();
        }
    }
})();


/*
2. Заполнить созданную таблицу буквами

    заполнить созданную таблицу буквами, отвечающими за шахматную фигуру. Например К - король, Ф – ферзь и тп.
    все фигуры должны стоять на своих местах и быть черными и белыми
*/
/*
3. * Заменить буквы, обозначающие фигуры картинками.
*/

(function (){

    var getFigures = function (elem) {
        var figures =  {
            king: [
                'https://upload.wikimedia.org/wikipedia/commons/3/3b/Chess_klt60.png',
                'https://upload.wikimedia.org/wikipedia/commons/e/e3/Chess_kdt60.png'
            ],
            queen: [
                'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png',
                'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png'
            ],
            pawn: [
                'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png',
                'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png'
            ],
            horse: [
                'https://upload.wikimedia.org/wikipedia/commons/2/28/Chess_nlt60.png',
                'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png'
            ],
            rook: [
                'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png',
                'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png'
            ],
            bishop: [
                'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png',
                'https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png'
            ]
        }

        var styleFigures = document.createElement('style');
        styleFigures.innerHTML = '.figures { background-position: center;} \n'
        +'.bking { background-image: url(\''+figures.king[1]+'\')}'
        +'.wking { background-image: url(\''+figures.king[0]+'\')}'
        +'.brook { background-image: url(\''+figures.rook[1]+'\')}'
        +'.wrook { background-image: url(\''+figures.rook[0]+'\')}'
        +'.bbishop { background-image: url(\''+figures.bishop[1]+'\')}'
        +'.wbishop { background-image: url(\''+figures.bishop[0]+'\')}'
        +'.bpawn { background-image: url(\''+figures.pawn[1]+'\')}'
        +'.wpawn { background-image: url(\''+figures.pawn[0]+'\')}'
        +'.bqueen { background-image: url(\''+figures.queen[1]+'\')}'
        +'.wqueen { background-image: url(\''+figures.queen[0]+'\')}'
        +'.bhorse { background-image: url(\''+figures.horse[1]+'\')}'
        +'.whorse { background-image: url(\''+figures.horse[0]+'\')}';

        document.querySelector('head').appendChild(styleFigures);

        for (var i = 1; i < elem.rows.length;++i) {
            for (var j = 1; j < elem.rows[i].cells.length;++j) {
                var elemRowsCells = elem.rows[i].cells[j];

                // Код получился не очень удачным, даже со второй попытки.
                // Даже с третьей попытки не ясно, как уменьшить кол-во ветвлений. 

                if (i === 2) {
                    elemRowsCells.classList.add('figures', 'wpawn');
                } else if (i === elem.rows[i].cells.length - 2) {
                    elemRowsCells.classList.add('figures', 'bpawn');
                }  else if (i === 1) {
                    if (j === 1 || j === elem.rows[i].cells.length - 1) {
                        elemRowsCells.classList.add('figures', 'wrook');
                    } else if (j === 2 || j === elem.rows[i].cells.length - 2) {
                        elemRowsCells.classList.add('figures', 'whorse');
                    } else if (j === 3 || j === elem.rows[i].cells.length - 3) {
                        elemRowsCells.classList.add('figures', 'wbishop');
                    } else if (j === 4) {
                        elemRowsCells.classList.add('figures', 'wking');
                    } else if (j === 5) {
                        elemRowsCells.classList.add('figures', 'wqueen');
                    }
                } else if (i === elem.rows[i].cells.length - 1) {
                    if (j === 1 || j === elem.rows[i].cells.length - 1) {
                        elemRowsCells.classList.add('figures', 'brook');
                    } else if (j === 2 || j === elem.rows[i].cells.length - 2) {
                        elemRowsCells.classList.add('figures', 'bhorse');
                    } else if (j === 3 || j === elem.rows[i].cells.length - 3) {
                        elemRowsCells.classList.add('figures', 'bbishop');
                    } else if (j === 4) {
                        elemRowsCells.classList.add('figures', 'bking');
                    } else if (j === 5) {
                        elemRowsCells.classList.add('figures', 'bqueen');
                    }
                }
            }
        }
/* Первая попытка. 
        for (var i = 0; i < 2; ++i){
            var tdElems = figures.white[i].childNodes;
            if (i === 1) {
                for(var k = 1; k < tdElems.length; ++k) {
                    figures.white[i].childNodes[k].style.backgroundImage = 'url(\''+figures.pawn[0]+'\')';
                    figures.white[i].childNodes[k].style.backgroundPosition = 'center';
                    figures.black[i].childNodes[k].style.backgroundImage = 'url(\''+figures.pawn[1]+'\')';
                    figures.black[i].childNodes[k].style.backgroundPosition = 'center';
                }
            } else {
                for(var k = 1; k < tdElems.length; ++k) {
                    var fiWhChNoSt = figures.white[i].childNodes[k].style;
                    var fiBlChNoSt = figures.black[i].childNodes[k].style;
                    // Очень неприятный копипаст, все таки лучше писать стили заранее в файле.

                    if (k === 1 || k === (tdElems.length - 1)) {
                        fiWhChNoSt.backgroundImage = 'url(\''+figures.rook[0]+'\')';
                        fiWhChNoSt.backgroundPosition = 'center';
                        fiBlChNoSt.backgroundImage = 'url(\''+figures.rook[1]+'\')';
                        fiBlChNoSt.backgroundPosition = 'center';
                    } else if (k === 2 || k === (tdElems.length - 2)) {
                        fiWhChNoSt.backgroundImage = 'url(\''+figures.horse[0]+'\')';
                        fiWhChNoSt.backgroundPosition = 'center';
                        fiBlChNoSt.backgroundImage = 'url(\''+figures.horse[1]+'\')';
                        fiBlChNoSt.backgroundPosition = 'center';
                    } else if (k === 3 || k === (tdElems.length - 3)) {
                        fiWhChNoSt.backgroundImage = 'url(\''+figures.bishop[0]+'\')';
                        fiWhChNoSt.backgroundPosition = 'center';
                        fiBlChNoSt.backgroundImage = 'url(\''+figures.bishop[1]+'\')';
                        fiBlChNoSt.backgroundPosition = 'center';
                    } else if (k === 4) {
                        fiWhChNoSt.backgroundImage = 'url(\''+figures.king[0]+'\')';
                        fiWhChNoSt.backgroundPosition = 'center';
                        fiBlChNoSt.backgroundImage = 'url(\''+figures.king[1]+'\')';
                        fiBlChNoSt.backgroundPosition = 'center';
                    } else if (k === 5) {
                        fiWhChNoSt.backgroundImage = 'url(\''+figures.queen[0]+'\')';
                        fiWhChNoSt.backgroundPosition = 'center';
                        fiBlChNoSt.backgroundImage = 'url(\''+figures.queen[1]+'\')';
                        fiBlChNoSt.backgroundPosition = 'center';
                    }
                }
            }
        }
*/
    }

    var btn = document.createElement('button');
    btn.classList.add('get-figures');
    btn.innerHTML = 'Заполнить поле';
    document.querySelector('body').appendChild(btn);

    btn.onclick = function () {
        if (!(document.querySelector('.figures')) && (document.querySelector('.table-chess')) ) {
            getFigures(document.querySelector('table'));
        }
    };

})();

/*
    4. * Оптимизировать скрипт из практики

    Оптимизировать работу 'practice.js'
    Вынести создание элемента из цикла(строка 9) var p = document.createElement('p');

*/

// Самое простое, что приходит в голову, это присваивать к строке новые шаги. 

(function() {

    var game = {
        count: 0,
        gameIsRunning: true,
        steps: [], // Массив, в котором будут храниться числа введённые игроком.
        showProgress: function (array) { // Это функция, которая преобразует массив с ходами к виду: 'Ход № : введённое игроком число' и выводит результат в консоль
            var p = document.createElement('p');
            var htmlClass = document.querySelector('.game');
            for (var i = 0, len = array.length; i<len; i++) {
                console.log('Ход №' + (i+1) + ': ' + array[i] );
                p.innerText += 'Ход №' + (i+1) + ': ' + array[i] + '\n';
            }
            htmlClass.appendChild(p);
            return this.steps;
        },
        random: function(min, max) {
            return Math.round(min + Math.random() * (max - min));
        },
        checkAnswer: function(random) {
            var answer = +prompt('Укажите число (-1 - закончить игру)');
            this.steps.push(answer); // Здесь добавляется в массив первый ход игрока.
    
            while(this.gameIsRunning) {
                if(answer === -1) {
                    this.gameIsRunning = false;
                } else if (answer == 0 && isNaN(answer)) {
                    alert('Вы не ввели число!\nВыход.');
                    this.gameIsRunning = false;
                } else if (answer == random) {
                    alert('Поздравляем, вы угадали число!');
                    this.gameIsRunning = false;
                } else {
                    this.count++;
                    if ( answer < random ) {
                        alert('Мало');
                    } else if ( answer > random ){
                        alert ('Много');
                    }
                    answer = +prompt('Укажите другое число(-1 - закончить игру)\nПопыток:' + this.count);
                    this.steps.push(answer); // А здесь в массив steps добавляются ходы игрока начиная со второго введённого числа. 
                }
            }
            this.showProgress(this.steps); // Вызов функции, которая выведет в консоль все ходы игрока
            console.log('Компьютер загадал число: ' + random);
        }
    }
    
    var btn = document.createElement('button');
    
    btn.innerHTML = 'Поиграть в игру';
    document.getElementsByTagName('body')[0].appendChild(btn);

    btn.onclick = function () {
        var htmlClass = document.createElement('div');

        htmlClass.classList.add('game');
        document.querySelector('body').appendChild(htmlClass);
        game.checkAnswer(game.random(1, 100));
    }

})();
