import { Router } from './modules/router';
import { Model } from './modules/model';
import { View } from './modules/view';

Router.handle('friends');

global.Handlebars.registerHelper('formatTime', function (time) {
  let minutes = parseInt(time / 60);
  let seconds = time - minutes * 60;

  minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;
  seconds = seconds.toString().length === 1 ? '0' + seconds : seconds;

  return minutes + ':' + seconds;
});

global.Handlebars.registerHelper('formatDate', function (ts) {
  return new Date(ts * 1000).toLocaleString();
});

let header = document.getElementById('header');

async function init () {
  try {
    await Model.login(6899585, 2 | 4 | 8 | 8192);

    let usersData = await Model.getUser();

    header.innerHTML = View.render('header', usersData[0]);

    document.addEventListener('click', (e) => {
      if (e.target.dataset.vkMethod) { Router.handle(e.target.dataset.vkMethod); }

      if (e.target.dataset.idPhoto && e.target.dataset.count > 0) {
        let list = e.target.nextElementSibling;
        let id = e.target.dataset.idPhoto;

        if (e.target.dataset.statusBtn === 'false') {
          if (!e.target.dataset.statusComments) {
            e.target.dataset.statusComments = 'true';
            Router.handle('comments', { id: id, elem: list });
          }

          e.target.dataset.statusBtn = 'true';
          e.target.innerText = 'Скрыть комментарии';
          list.classList.remove('photos__list_hidden');
        } else {
          e.target.dataset.statusBtn = 'false';
          e.target.innerText = 'Показать комментарии';
          list.classList.add('photos__list_hidden');
        }
      }

      if (e.target.dataset.sortBy && !e.target.classList.contains('sort__button_active')) {
        let sortType = e.target.dataset.sortBy;

        Router.handle('sort', { by: sortType });

        let activeBtns = document.querySelectorAll('.sort__button_active');
        let currBtn = document.querySelector('button[data-sort-by="' + sortType + '"]');

        activeBtns.forEach(elem => { elem.classList.remove('sort__button_active'); });
        currBtn.classList.add('sort__button_active');
      }
    });
  } catch (e) {
    console.error(e);
    window.alert('Ошибка: ' + e.message);
  }
}

window.addEventListener('DOMContentLoaded', init);
