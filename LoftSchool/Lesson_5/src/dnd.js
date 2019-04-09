/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let elem = document.createElement('div');

    elem.classList.add('draggable-div');

    function randomSize(max) {
        return (Math.floor(Math.random() * (max - 100)) + 100);
    }

    let letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    elem.style.position = 'absolute';
    elem.style.width = elem.style.height = randomSize(350) + 'px';
    elem.style.backgroundColor = color;
    elem.style.top = randomSize((window.innerHeight - parseInt(elem.style.height))) + 'px';
    elem.style.left = randomSize((window.innerWidth - parseInt(elem.style.height))) + 'px';

    elem.setAttribute('draggable', 'true');

    return elem;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    let offsetX, offsetY;

    target.addEventListener('dragstart', function (e) {
        e.dataTransfer.setDragImage(document.createElement('div'), 0, 0);

        offsetX = e.pageX - parseInt(e.target.style.left);
        offsetY = e.pageY - parseInt(e.target.style.top);
    });

    target.addEventListener('drag', function (e) {
        e.target.style.left = e.pageX - offsetX + 'px';
        e.target.style.top = e.pageY - offsetY + 'px';
    });

    target.addEventListener('dragend', function (e) {
        e.target.style.left = e.pageX - offsetX + 'px';
        e.target.style.top = e.pageY - offsetY + 'px';
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});
export {
    createDiv
};
