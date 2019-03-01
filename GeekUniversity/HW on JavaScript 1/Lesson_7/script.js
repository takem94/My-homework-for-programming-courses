/*

Урок 7. Урок-практикум
1. Выводить счёт в режиме реального времени
2. Генерировать временные препятствия на поле
3. * Убрать границы поля
    – при пересечении границы поля змейка появляется с противоположной стороны

*/

var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var snakeSpeed = 300; // интервал в мс между перемещениями змейки // UPD: Больше не константа, скорость увелич. динамически. 
var snake = []; // змейка
var letArr = []; // Препятствия, которые нужно динамически изменять на поле.
var direction = "x-"; // по умолчанию змейка движется вверх, уменьшая координату x
var gameIsRunning = false;
var snake_timer;
var food_timer;
var let_timer;
var score = 0;

function init() {
  prepareGameField();
  document.querySelector('#snake-start').addEventListener('click', startGame);
  document.querySelector('#snake-renew').addEventListener('click', refreshGame);
  addEventListener('keydown', changeDirection);
}

function prepareGameField() {
  var snakeField = document.querySelector('#snake-field');
  var game_table = document.createElement('table');
  var gameScore = document.createElement('div');

  gameScore.classList.add('game-score');
  gameScore.innerHTML = '0';
  game_table.classList.add('game-table');

  // генерируем строки и ячейки игровой таблицы
  for(var i = 0; i < FIELD_SIZE_X; i++) {
    var row = document.createElement('tr');
    row.classList.add('game-table-row');
    row.dataset.row = i;

    for(var j = 0; j < FIELD_SIZE_Y; j++) {
      var cell = document.createElement('td');
      cell.classList.add('game-table-cell');
      cell.dataset.cell = i + '-' + j;

      row.appendChild(cell);
    }
    game_table.appendChild(row);
  }
  snakeField.appendChild(gameScore);
  snakeField.appendChild(game_table);
}

function startGame() {
  gameIsRunning = true;
  document.querySelector('.game-score').style.display = 'block';
  respawn();

  snake_timer = setInterval(move, snakeSpeed);
  let_timer = setInterval(createLet, 7000);
  setTimeout(createFood, 5000);
}

// располагаем змейку на игровом поле
function respawn() {
  // стандартная длина змейки - 2
  var start_coord_x = Math.floor(FIELD_SIZE_X/2);
  var start_coord_y = Math.floor(FIELD_SIZE_Y/2);

  var snake_head = document.querySelector("[data-cell='" + start_coord_x + "-" + start_coord_y + "']");
  snake_head.classList.add('snake-unit');

  var snake_tail = document.querySelector("[data-cell='" + (start_coord_x - 1) + "-" + start_coord_y + "']");
  snake_tail.classList.add('snake-unit');

  snake.push(snake_head, snake_tail);
}

function move() {
  var snake_head = snake[snake.length - 1];
  var new_unit;
  var snake_coords = snake_head.dataset.cell.split('-');
  var coord_x = parseInt(snake_coords[0]);
  var coord_y = parseInt(snake_coords[1]);

  // определяем новую точку
  if(direction == "x-") {
    new_unit = document.querySelector("[data-cell='"+ (coord_x - 1) + '-' + coord_y +"']");
    (new_unit === null) ? new_unit = document.querySelector("[data-cell='"+ (FIELD_SIZE_X - 1) + '-' + coord_y +"']") : new_unit = new_unit;
  } else if (direction == "x+") {
    new_unit = document.querySelector("[data-cell='"+ (coord_x + 1) + '-' + coord_y +"']");
    (new_unit === null) ? new_unit = document.querySelector("[data-cell='"+ 0 + '-' + coord_y +"']") : new_unit = new_unit;
  } else if (direction == "y+") {
    new_unit = document.querySelector("[data-cell='"+ coord_x + '-' + (coord_y + 1)  +"']");
    (new_unit === null) ? new_unit = document.querySelector("[data-cell='"+ coord_x + '-' + 0 +"']") : new_unit = new_unit;
  } else if (direction == "y-") {
    new_unit = document.querySelector("[data-cell='"+ coord_x + '-' + (coord_y - 1)  +"']");
    (new_unit === null) ? new_unit = document.querySelector("[data-cell='"+ coord_x + '-' + (FIELD_SIZE_Y - 1) +"']") : new_unit = new_unit;
  }

  // проверяем, что new_unit – не часть змейки
  // так же проверяем, что змейка не дошла до границы
  if(!isUnit(letArr,new_unit) && !isUnit(snake,new_unit) && new_unit !== null) {
    new_unit.classList.add('snake-unit');
    snake.push(new_unit);

    // если змейка не ела, убираем хвост
    if(!haveFood(new_unit)) {
      var removed = snake.splice(0, 1)[0];
      removed.classList.remove('snake-unit', 'food-unit');
    }
  } else {
    finishTheGame();
  }
}

function isUnit(where,what) {
  var check = false;
  if(where.includes(what))
    check = true;
  return check;
}

function finishTheGame() {
  gameIsRunning = false;
  clearInterval(snake_timer);
  clearInterval(let_timer);
  alert('GAME OVER! Score: ' + score);
  refreshGame();
}

// проверяем встречу с едой
function haveFood(unit) {
  var check = false;
  var isSnakeEating = unit.classList.contains('food-unit');

  // змейка съела еду
  if(isSnakeEating) {
    check = true;

    // создаеи новую еду
    setTimeout(createFood,3000);

    // увеличиваем количество очков
    document.querySelector('.game-score').innerHTML = ++score;

    if (snakeSpeed > 100) {
      snakeSpeed -= 10;
      clearInterval(snake_timer);
      snake_timer = setInterval(move,snakeSpeed);
    }
  }
  return check;
}

function createFood() {
  var food_x = Math.floor(Math.random() * (FIELD_SIZE_X));
  var food_y = Math.floor(Math.random() * (FIELD_SIZE_Y));

  var food_cell = document.querySelector("[data-cell='" + food_x + '-' + food_y +"']");
  var isSnake = food_cell.classList.contains('snake-unit'); // true || false
  
  //если нет змейки
  if(!isSnake) {
    food_cell.classList.add('food-unit');
  } else {
    createFood();
  }
}

function createLet() {
  var let_x = Math.floor(Math.random() * (FIELD_SIZE_X));
  var let_y = Math.floor(Math.random() * (FIELD_SIZE_Y));

  var let_cell = document.querySelector("[data-cell='" + let_x + '-' + let_y +"']");

  var isSnakeFoodLet = let_cell.classList.contains('snake-unit','food-unit','let-unit');

  if (letArr.length == 10) {
    var removed = letArr.splice(0, 1)[0];
    removed.classList.remove('let-unit');
  }

  if(!isSnakeFoodLet) {
      let_cell.classList.add('let-unit');
      letArr.push(let_cell);
  } else {
    createLet();
  }
} 

function changeDirection(e) {
  switch(e.keyCode) {
    case 37: // нажата клавиша влево
      if(direction != "y+") 
        direction = "y-";
    break;
    case 38: // нажата клавиша вверх
      if(direction != "x+")
        direction = "x-";
    break;
    case 39: // нажата клавиша вправо
      if(direction != "y-")
        direction = "y+";
    break;
    case 40: // нажата клавиша вниз
      if(direction != "x-")
        direction = "x+";
    break;
  }
}

// новая игра
function refreshGame() {
  location.reload();
}

window.onload = init;