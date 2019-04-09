import { DnD } from './modules/dnd';
import { getCookies } from './modules/getCookies';
import { isMatching } from './modules/isMatching';

function VkAuth (params) {
  return new Promise((resolve, reject) => {
    global.VK.init({
      apiId: 6899585
    });

    global.VK.Auth.login((data) => {
      if (data.session) {
        resolve(data);
      } else {
        reject(new Error('Не удалось авторизоваться.'));
      }
    }, params);
  });
}

function VkCallMethod (method, params) {
  return new Promise((resolve, reject) => {
    params.v = '5.92';

    global.VK.api(method, params, function (response) {
      if (response.error) {
        reject(new Error('Ошибка вызова метода'));
      } else {
        resolve(response);
      }
    });
  });
}

function transformBtn (toRemove, toAdd) {
  return (btn) => {
    btn.classList.remove(...toRemove);
    btn.classList.add(...toAdd);
  };
}

function load () {
  const loginBtn = document.getElementById('loginBtn');
  const bodyFriends = document.querySelector('.friends-filter__body');
  const allFriends = document.querySelector('#allFriends .simplebar-content');
  const favFriends = document.querySelector('#favoriteFriends .simplebar-content');
  const sourceElem = document.getElementById('friendsElem').innerHTML;

  const inputAll = document.getElementById('searchAll');
  const inputFav = document.getElementById('searchFav');

  const saveBtn = document.getElementById('btnSave');

  let savedElems = [];
  let cookiesFriends = getCookies();

  if (cookiesFriends['users_id']) {
    savedElems = JSON.parse(cookiesFriends['users_id']);
  }

  // Turn on DnD for favorite friends list
  let settingsDnD = {
    fromZone: allFriends,
    toZone: favFriends,
    fromId: 'allFriends',
    toId: 'favoriteFriends',
    elemClass: 'friends-list__elem',
    toWrapperClass: 'friends-filter__body-list',
    transformBtn: transformBtn(['friends-list__elem-action_add', 'cross_rotate'], ['friends-list__elem-action_rm'])
  };

  let favFriendsDnD = new DnD(settingsDnD);
  favFriendsDnD.init();

  // Turn on DnD for all friends list
  settingsDnD.fromZone = favFriends;
  settingsDnD.toZone = allFriends;
  settingsDnD.fromId = 'favoriteFriends';
  settingsDnD.toId = 'allFriends';
  settingsDnD.transformBtn = transformBtn(['friends-list__elem-action_rm'], ['friends-list__elem-action_add', 'cross_rotate']);

  let allFriendsDnd = new DnD(settingsDnD);
  allFriendsDnd.init();

  async function asyncVkInit () {
    try {
      let result = await VkAuth(6);

      result = await VkCallMethod('users.get', { fields: ' photo_100' });

      let userElem = document.querySelector('.header-content__user');
      let userName = document.querySelector('.header-content__user-name');
      let userImg = userElem.querySelector('img');

      userName.innerHTML = `${result.response[0]['first_name']} <span>${result.response[0]['last_name']}</span>`;
      userImg.src = result.response[0]['photo_100'];
      userElem.classList.remove('hide');

      let favList = { items: [] };
      result = await VkCallMethod('friends.get', { fields: ' photo_100' });

      for (let i = result.response.items.length - 1; i >= 0; --i) {
        let elem = result.response.items[i];

        if (savedElems.includes((elem.id + ''))) {
          elem.rm = true;
          favList.items.push(elem);
          result.response.items.splice(i, 1);
        }
      }

      let template = global.Handlebars.compile(sourceElem);

      allFriends.innerHTML = template(result.response);
      favFriends.innerHTML = template(favList);
    } catch (e) {
      console.error(e.message);
    }
  }

  loginBtn.addEventListener('click', function getFriends () {
    asyncVkInit();

    loginBtn.removeEventListener('click', getFriends);
    loginBtn.classList.add('hide');
  });

  function searchFriends (from) {
    return function (e) {
      let elems = from.querySelectorAll('.friends-list__elem');
      let searchValue = e.target.value;

      for (let key = 0; key < elems.length; ++key) {
        let item = elems[key];
        let itemValue = item.children[1].innerText;

        if (isMatching(itemValue, searchValue)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      }
    };
  }

  inputAll.addEventListener('input', searchFriends(allFriends));
  inputFav.addEventListener('input', searchFriends(favFriends));

  function saveFriends () {
    let elems = favFriends.children;

    savedElems = [];

    for (let i = 0; i < elems.length; ++i) {
      if (elems[i].dataset.id) { savedElems.push(elems[i].dataset.id); }
    }

    if (savedElems.length) {
      window.alert('Нет друзей для сохранения');
      return null;
    }

    let expires = new Date();
    expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    expires = expires.toUTCString();

    let jsonString = JSON.stringify(savedElems);

    document.cookie = `users_id=${jsonString}; expires=${expires}; path=/`;

    window.alert('Друзья сохранены в избранные');
  }

  saveBtn.addEventListener('click', saveFriends);

  function transferFriend (e) {
    let elem = e.target.parentNode;

    if (e.target.classList.contains('friends-list__elem-action_add')) {
      transformBtn(['friends-list__elem-action_add', 'cross_rotate'], ['friends-list__elem-action_rm'])(e.target);
      favFriends.appendChild(elem);
    } else if (e.target.classList.contains('friends-list__elem-action_rm')) {
      transformBtn(['friends-list__elem-action_rm'], ['friends-list__elem-action_add', 'cross_rotate'])(e.target);
      allFriends.appendChild(elem);
    }
  }

  bodyFriends.addEventListener('click', transferFriend);
}

(function () {
  window.addEventListener('DOMContentLoaded', load);
})();
