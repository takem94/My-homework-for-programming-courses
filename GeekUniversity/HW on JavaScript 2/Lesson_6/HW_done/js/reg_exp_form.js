"use strict";

(function () {
    window.onload =  function () {

        let form = document.getElementById('registryForm'),
            cityInput = document.getElementById('userCity'),
            autoCompList = document.getElementsByClassName('registration-form__auto-complete-list')[0];

        let toggle = false,
            prevValue = '',
            resultHistory = [],
            activeItem = null,
            data;

        let ajaxPromise = new Promise(function (resolve,reject) {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', './cities.json', true);

            xhr.send(); // (1)

            xhr.onreadystatechange = function() { // (3)
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    alert(xhr.status + ': ' + xhr.statusText);
                    reject(xhr.status + ': ' + xhr.statusText);
                } else {
                    let answer = JSON.parse(xhr.responseText);
                    resolve(answer);
                }
            };
        });

        function dataChecker(data) {
            let result;
            let regExp;

            switch (data.name) {
                case 'userName':
                    regExp = new RegExp('^[а-яёА-ЯЁa-zA-Z-]{1,15}\\s[а-яёА-ЯЁa-zA-Z-]{1,15}\\s[а-яёА-ЯЁa-zA-Z-]{1,15}$','i');
                    result = regExp.test(data.value);
                    break;
                case 'userEmail':
                    regExp = new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$','i');
                    result = regExp.test(data.value);
                    break;
                case 'phoneNumber':
                    regExp = new RegExp('^[+]?\\d[(]?\\d{3}[)]?\\d{3}[-]?\\d{4}$','i');
                    result = regExp.test(data.value);
                    break;
                case 'userCity':
                    result = !(data.value.length < 3);
                    break;
                case 'userBirth':
                    regExp = new RegExp('^\\d{2}\.\\d{2}\.\\d{4}$','i');
                    result = regExp.test(data.value);
                    break;

                default: result = true;
            }
            return result;
        }

        function dataSortAndRender(data,regEx,render) {
            let result = [];
            render = render || false;

            for (let i = 0; i < data.length; ++i) {

                if (regEx.test(data[i])){
                    result.push(data[i]);

                    if(!render) {
                        let newElem = document.createElement('li');
                        newElem.classList.add('registration-form__auto-complete-item');
                        newElem.innerText = data[i];
                        autoCompList.appendChild(newElem);
                    }
                }
            }

            console.log('Пробежали по массиву ' + data.length + ' раз');

            return result;
        }

        function elemShow(elem) {
            elem.style.zIndex = '9999';
            elem.style.opacity = '1';
            elem.style.transform = 'scale(1.1)';
        }

        function elemHide(elem) {
            elem.style.zIndex = '-1';
            elem.style.opacity = '0';
            elem.style.transform = 'scale(1)';
        }

        cityInput.addEventListener('input',function (e) {
            e.preventDefault();

            let regEx = new RegExp('^'+cityInput.value,'i'),
                toRender = (cityInput.value.length < 3),
                toPush = [], // for check result of search
                toPop = false; // for tracking if we already searched for this value

            if (!toRender) {
                // If value have more than 2 chars, we gonna show result of search.
                autoCompList.innerHTML = '';
                activeItem = null;

                if (!toggle) {
                    // If this is first request for search.
                    toggle = true;

                    ajaxPromise.then(function (result) {
                        data = result;
                        toPush = dataSortAndRender(data,regEx,toRender);
                        elemShow(autoCompList.parentNode);
                    });
                } else if (resultHistory.length > 0 && prevValue.length < cityInput.value.length) {
                    // If this is next char of previous search value. Its not strict compare, and maybe have problem.
                    toPush = dataSortAndRender(resultHistory[resultHistory.length - 1],regEx,toRender);
                } else if (
                    prevValue.slice(0,(prevValue.length - 1)) === cityInput.value
                    && cityInput.value !== ''
                    && (resultHistory.length - 2) >= 0
                ) {
                    // If we already searched by this value.
                    toPush = dataSortAndRender(resultHistory[resultHistory.length - 2],regEx,toRender);
                    toPop = true;
                } else {
                    // All other cases.
                    resultHistory = [];
                    toPush = dataSortAndRender(data,regEx,toRender);
                }

                elemShow(autoCompList.parentNode);

                // This need for controlling our resultHistory, to except collisions.
                if (toPush.length > 0 && !toPop)
                    resultHistory.push(toPush);
                else if (toPush.length === 0 && !toPop && resultHistory.length > 0) {
                    resultHistory.push(resultHistory[resultHistory.length - 1]);
                    elemHide(autoCompList.parentNode);
                } else
                    resultHistory = resultHistory.splice(0,(resultHistory.length-1));

                prevValue = cityInput.value;
            } else {
                resultHistory = [];
                elemHide(autoCompList.parentNode);
            }
        });

        cityInput.addEventListener('keydown',function (e) {
            // For manage list of search results by buttons on keyboard.
            if (e.key === 'ArrowUp' && autoCompList.children.length > 0){
                e.preventDefault();

                if (activeItem === null) {
                    activeItem = autoCompList.lastChild;
                } else {
                    activeItem.classList.remove('registration-form__auto-complete-item_active');

                    if (activeItem.previousElementSibling !== null)
                        activeItem = activeItem.previousElementSibling;
                    else
                        activeItem = activeItem.parentNode.lastChild;
                }
                activeItem.classList.add('registration-form__auto-complete-item_active');
                activeItem.scrollIntoView(true);
            }

            if (e.key === 'ArrowDown' && autoCompList.children.length > 0) {
                e.preventDefault();

                if (activeItem === null) {
                    activeItem = autoCompList.firstChild;
                } else {
                    activeItem.classList.remove('registration-form__auto-complete-item_active');

                    if (activeItem.nextElementSibling !== null)
                        activeItem = activeItem.nextElementSibling;
                    else
                        activeItem = activeItem.parentNode.firstChild;
                }
                activeItem.classList.add('registration-form__auto-complete-item_active');
                activeItem.scrollIntoView(false);
            }

            if (e.key === 'Enter' && activeItem !== null) {
                e.preventDefault();

                cityInput.value = activeItem.innerText;
                let event = new Event("input");
                cityInput.dispatchEvent(event);

                elemHide(autoCompList.parentNode);
            }
        });

        autoCompList.addEventListener('click',function (e) {
            // For getting value from selected item.
            e.preventDefault();

            if (e.target.classList.contains('registration-form__auto-complete-item')){
                cityInput.value = e.target.innerText;

                let event = new Event("input");
                cityInput.dispatchEvent(event);

                elemHide(autoCompList.parentNode);
            }
        });

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Check all inputs on errors.
            let error = 0;

            for (let i = 0; i < (e.target.length - 1); ++i){

                if (!dataChecker(e.target[i])) {

                    if(!e.target[i].classList.contains('registration-form__input_error'))
                        e.target[i].classList.add('registration-form__input_error');

                    error++;
                    $(e.target[i]).effect("bounce", {}, 500);
                }
            }

            if (error > 0) {
                $('#demoDialog').text('Ошибка в ' + error + ' полях.').dialog('open');
            }
        });

        form.addEventListener('focusin', function (e) {
            e.preventDefault();

            if(e.target.classList.contains('registration-form__input')) {

                if(e.target.classList.contains('registration-form__input_error')){
                    e.target.classList.remove('registration-form__input_error');
                }

                if (e.target.value === '' && e.target.dataset.holder == undefined) {
                    e.target.setAttribute('data-holder', e.target.attributes.placeholder.value);
                    e.target.attributes.placeholder.value = '';
                }

                if (e.target.attributes.name.value === 'userCity' && e.target.value.length > 2) {
                    elemShow(autoCompList.parentNode);
                }
            }
        });

        form.addEventListener('focusout', function (e) {
            e.preventDefault();

            if(e.target.classList.contains('registration-form__input')) {

                if(!dataChecker(e.target) && e.target.name !== 'userBirth') {
                    e.target.classList.add('registration-form__input_error');
                    $(e.target).effect("bounce", {}, 500);
                }

                if(e.target.value === '' && e.target.dataset.holder !== undefined){
                    e.target.attributes.placeholder.value = e.target.dataset.holder;
                    e.target.removeAttribute('data-holder');
                }

                if (e.target.attributes.name.value === 'userCity') {
                    elemHide(autoCompList.parentNode);
                }
             }
        });

        $('#userBirth').datepicker({
            changeMonth: true,
            changeYear: true,
            onClose: function () {
                var input = $('#userBirth');

                if(dataChecker(input[0]))
                    input.removeClass('registration-form__input_error');
                else {
                    input.addClass('registration-form__input_error');
                    input.effect("bounce", {}, 500);
                }
            },
            monthNamesShort: [ "Янв", "Феб", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Ноя", "Дек" ],
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            dayNamesMin: [ "ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ" ]
        });

        $("#demoDialog").dialog({
            autoOpen: false,
            modal: true,
            buttons: [{text: "Close", click: function() {$(this).dialog("close")}}]
        });
    };
})();