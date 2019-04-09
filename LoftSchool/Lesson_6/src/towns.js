/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
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
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        let ajax = new XMLHttpRequest();

        ajax.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

        ajax.send();

        ajax.onload = function () {
            if (ajax.status === 200) {
                let data = JSON.parse(ajax.responseText);

                data = data.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    }

                    return 0;
                });

                loadingBlock.style.display = 'none';
                filterBlock.style.display = 'block';

                resolve(data);
            } else {
                reject();
            }
        }
    });
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    return new RegExp(chunk, 'i').test(full);
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise = loadTowns();
/*
    Задание со звездочкой, но оно увеличивает количество строк, из-за чего результаты подсвечивает желтым.

    townsPromise.catch(function onError() {
        let button = document.createElement('button'),
            message = document.createElement('p');

        message.textContent = 'Не удалось загрузить города';
        button.textContent = 'Повторить';

        loadingBlock.style.display = 'none';

        function repeat () {
            townsPromise = loadTowns();

            loadingBlock.style.display = 'block';

            button.removeEventListener('click', repeat);

            message.outerHTML = '';
            button.outerHTML = '';

            townsPromise.catch(onError);
        }

        button.addEventListener('click', repeat);

        homeworkContainer.appendChild(message).appendChild(button);
    });
*/

filterInput.addEventListener('keyup', function(e) {

    filterResult.innerHTML = '';

    townsPromise.then(function (data) {

        if (e.target.value.length < 1) {
            return;
        }

        for (let key in data) {
            if (isMatching(data[key].name, e.target.value)) {
                let elem = document.createElement('p');

                elem.textContent = data[key].name;

                filterResult.appendChild(elem);
            }
        }
    });
});

export {
    loadTowns,
    isMatching
};
