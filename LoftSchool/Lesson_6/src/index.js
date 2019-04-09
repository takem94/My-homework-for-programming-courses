/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
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

                resolve(data);
            } else {
                reject();
            }
        }
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
