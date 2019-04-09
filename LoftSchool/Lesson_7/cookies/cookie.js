/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

function addCookie (name, value) {
    let date = new Date();

    date.setTime(+date + (365 * 86400000));
    date = date.toUTCString();

    document.cookie = `${name}=${value}; expires=${date}; path=/`;
}

function getCookies () {
    let res = {};

    let cookies = document.cookie;

    if (cookies.length < 1) {
        return res;
    }

    cookies = cookies.split('; ');

    cookies.forEach(function (item) {
        let arr = item.split('=');

        res[arr[0]] = arr[1];
    });

    return res;
}

function deleteCookie (name) {
    let date = new Date().toUTCString();

    document.cookie = `${name}=; expires=${date}; path=/`;
}

function isMatching(full, chunk) {
    return new RegExp(chunk, 'i').test(full);
}

function createCookieRow(name, value) {
    let row = document.createElement('tr');

    let cellName = document.createElement('th'),
        cellValue = document.createElement('th'),
        cellDelete = document.createElement('th');

    let btnDelete = document.createElement('button');

    cellName.textContent = name;
    cellValue.textContent = value;
    btnDelete.textContent = 'Удалить';

    btnDelete.setAttribute('data-name', name);
    btnDelete.setAttribute('class', 'remove-btn');

    cellDelete.appendChild(btnDelete);

    row.appendChild(cellName);
    row.appendChild(cellValue);
    row.appendChild(cellDelete);

    return row;
}

function renderCookies (allCookies) {

    listTable.innerHTML = '';

    for (let key in allCookies) {
        listTable.appendChild(createCookieRow(key, allCookies[key]));
    }
}

listTable.addEventListener('click', e => {
    if (e.target.classList.contains('remove-btn')) {
        deleteCookie(e.target.dataset.name);
        renderCookies(getCookies());
    }
});

filterNameInput.addEventListener('keyup', e => {
    if (e.target.value.length > 0) {
        let currentCookies = getCookies(),
            currentValue = e.target.value,
            toShowCookies = {};

        for (let key in currentCookies) {
            if (isMatching(key, currentValue || isMatching(currentCookies[key], currentValue))) {
                toShowCookies[key] = currentCookies[key];
            }
        }

        renderCookies(toShowCookies);
    } else {
        renderCookies(getCookies());
    }
});

addButton.addEventListener('click', () => {
    if (addNameInput.value.length > 0 && addValueInput.value.length > 0) {
        addCookie(addNameInput.value, addValueInput.value);

        addNameInput.value = addValueInput.value = '';

        filterNameInput.dispatchEvent(new Event('keyup'));
    }
});

renderCookies(getCookies());