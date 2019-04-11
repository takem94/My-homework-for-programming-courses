"use strict";

(function () {
    window.onload =  function () {

        let form = document.getElementById('registryForm');

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

                default: result = true;
            }

            return result;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let error = 0;

            for (let i = 0; i < (e.target.length - 1); ++i){

                if (!dataChecker(e.target[i]) && !e.target[i].classList.contains('registration-form__input_error')) {
                    e.target[i].classList.add('registration-form__input_error');
                    error++;
                }
            }

            if (error > 0) {
                alert('Ошибка в ' + error + ' полях.');
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
            }
        });

        form.addEventListener('focusout', function (e) {
            e.preventDefault();

            if(e.target.classList.contains('registration-form__input')) {

                if(!dataChecker(e.target)){
                    e.target.classList.add('registration-form__input_error')
                }

                if(e.target.value === '' && e.target.dataset.holder !== undefined){

                    e.target.attributes.placeholder.value = e.target.dataset.holder;
                    e.target.removeAttribute('data-holder');
                }
            }
        });
    };
})();