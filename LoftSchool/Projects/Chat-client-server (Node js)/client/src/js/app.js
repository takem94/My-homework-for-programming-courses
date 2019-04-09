'use strict';

function load () {
  const modalTemplate = document.getElementById('modalTemplate').innerHTML;
  const avatarTemplate = document.getElementById('avatarTemplate').innerHTML;
  const authTemplate = document.getElementById('authenticationTemplate').innerHTML;
  const usersTemplate = document.getElementById('usersTemplate').innerHTML;
  const messageTemplate = document.getElementById('messageTemplate').innerHTML;

  let modalRender = global.Handlebars.compile(modalTemplate);
  let avatarRender = global.Handlebars.compile(avatarTemplate);
  let authRender = global.Handlebars.compile(authTemplate);
  let usersRender = global.Handlebars.compile(usersTemplate);
  let messageRender = global.Handlebars.compile(messageTemplate);

  function showAuth () {
    document.body.innerHTML += modalRender({ windowName: 'Авторизация', windowBody: authRender({}) });
  }

  function showAvatarChanger () {
    document.body.innerHTML += modalRender({ windowName: 'Смена аватара', windowBody: avatarRender({}) });
  }

  function removeModal () {
    let modal = document.getElementById('modal');
    if (modal) { modal.outerHTML = ''; }
  }

  function changeChatName (firstName, lastName) {
    let nameElem = document.getElementById('chatUserName');
    nameElem.innerText = `${firstName} ${lastName}`;
  }

  function changeAvatar (src) {
    let avatar = document.querySelector('.user-profile__avatar img');
    avatar.src = src;
  }

  function changePreview (src) {
    let avatar = document.querySelector('.drag-n-drop__preview');
    avatar.src = src;
  }

  function changeAvatarMessage (userId, src) {
    let allMessages = document.querySelectorAll(`li[data-user-id="${userId}"] img`);

    allMessages.forEach(elem => {
      elem.setAttribute('src', src);
    });
  }

  function listScrollToBottom (elem) {
    elem.scrollTop = elem.scrollHeight;
  }

  function renderUserListPanel (data) {
    let chatPanel = document.getElementById('chatPanel');
    chatPanel.innerHTML = usersRender(data);
  }

  function showChatArea () {
    let chatArea = document.getElementById('chat');
    chatArea.style.opacity = '1';
    chatArea.offsetHeight;
  }

  function hideChatArea () {
    let chatArea = document.getElementById('chat');
    chatArea.style.opacity = '0';
    chatArea.offsetHeight;
  }

  function parseTime (time) {
    time = new Date(time);

    time = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + ':' +
        (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + ':' +
        (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds());

    return time;
  }

  function removeAnimation (messageId, time) {
    let elem = document.querySelector(`li[data-message-id="${messageId}"]`);

    setTimeout(() => { elem.classList.remove('fade-in'); }, time);
  }

  let fileReader;
  let result;
  let dragAndDrop;
  let dragTimeout;
  let dragZoneTimeout;

  let eventsObject = {
    onUploadChange (e) {
      let file = e.target.files[0];

      fileReader = new global.FileReader();

      fileReader.addEventListener('loadend', this.onEnd.bind(this));

      if (file && file.type === 'image/jpeg') {
        fileReader.readAsDataURL(file);
      } else {
        window.alert('Пожалуйста, выберите файл с расширением jpeg.');
      }

      e.target.removeEventListener('change', this.onUploadChange);
    },
    onEnd () {
      result = {
        type: 'user-avatar',
        data: fileReader.result
      };

      changePreview(fileReader.result);
      fileReader.removeEventListener('loadend', this.onEnd);
    },
    onDrag (e) {
      e.preventDefault();

      console.log('Class: eventsObject, Line: 116 ', e);
    },
    preventDefaults (e) {
      e.preventDefault();
      e.stopPropagation();
    },
    highlight () {
      dragAndDrop.classList.add('highlight');
    },
    unhighlight () {
      dragAndDrop.classList.remove('highlight');
    },
    onEnter () {
      if (!dragAndDrop) { return; }

      dragAndDrop.classList.add('prepare');
    },
    onEndDrag () {
      dragAndDrop.classList.remove('prepare');
    },
    onDragOver () {
      if (!dragAndDrop) { return; }

      if (dragTimeout !== undefined) { window.clearTimeout(dragTimeout); }

      dragTimeout = window.setTimeout(function () {
        eventsObject.onEndDrag();
      }, 200);
    },
    onDragEnterZone () {
      dragAndDrop.classList.add('highlight');
    },
    onDragOverZone () {
      if (!dragAndDrop) { return; }

      eventsObject.onDragOver();

      if (dragZoneTimeout !== undefined) { window.clearTimeout(dragZoneTimeout); }

      dragZoneTimeout = window.setTimeout(function () {
        dragAndDrop.classList.remove('highlight');
      }, 200);
    },
    onDropZone (e) {
      let uploader = document.getElementById('imgUpload');
      let dropedFiles = e.dataTransfer.files;

      if (uploader) {
        uploader.files = dropedFiles;
      } else {
        return;
      }

      uploader.addEventListener('change', eventsObject.onUploadChange.bind(eventsObject));
      uploader.dispatchEvent(new global.Event('change'));
    },
    doDnDListeners (dragAndDrop, what) {
      let whatToDo;

      if (what === 'unset') {
        whatToDo = 'removeEventListener';
      } else if (what === 'set') {
        whatToDo = 'addEventListener';
      } else {
        return;
      }

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dragAndDrop[whatToDo](eventName, eventsObject.preventDefaults);
      });

      dragAndDrop[whatToDo]('dragenter', eventsObject.onDragEnterZone, false);
      dragAndDrop[whatToDo]('dragover', eventsObject.onDragOverZone, false);
      dragAndDrop[whatToDo]('drop', eventsObject.onDropZone, false);
    }
  };

  document.addEventListener('dragenter', eventsObject.onEnter, false);
  document.addEventListener('dragover', eventsObject.onDragOver, false);

  document.addEventListener('click', (e) => {
    if (e.target.parentElement.classList.contains('user-profile__avatar')) {
      showAvatarChanger();

      dragAndDrop = document.querySelector('.drag-n-drop__zone');

      eventsObject.doDnDListeners(dragAndDrop, 'set');
    }

    if (e.target.classList.contains('drag-n-drop__add')) {
      let uploader = document.getElementById('imgUpload');
      dragAndDrop = document.querySelector('.drag-n-drop__zone');

      uploader.addEventListener('change', eventsObject.onUploadChange.bind(eventsObject));
      uploader.dispatchEvent(new window.MouseEvent('click'));
    }

    if (e.target.getAttribute('id') === ('saveBtnAvatar')) {
      if (result) {
        ws.send(JSON.stringify(result));
        eventsObject.doDnDListeners(dragAndDrop, 'unset');
        removeModal();
      } else {
        window.alert('Фото не выбрано.');
      }
    }

    if (e.target.getAttribute('id') === ('cancelBtnAvatar')) {
      eventsObject.doDnDListeners(dragAndDrop, 'unset');
      removeModal();
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.getAttribute('id') === 'auth') {
      e.preventDefault();

      let fnameInput = document.getElementById('fname');
      let lnameInput = document.getElementById('lname');

      if (fnameInput.value.length > 2 && lnameInput.value.length > 2) {
        let userData = {
          fullName: `${fnameInput.value} ${lnameInput.value}`,
          firstName: fnameInput.value,
          lastName: lnameInput.value,
          type: 'user-join'
        };

        ws.send(JSON.stringify(userData));
      }
    }

    if (e.target.getAttribute('id') === 'messageForm') {
      e.preventDefault();

      let messageInput = document.getElementById('messageInput');

      if (messageInput.value.length > 0) {
        let dataToSend = {
          message: messageInput.value,
          fullName: userInfo.fullName,
          type: 'user-message'
        };

        ws.send(JSON.stringify(dataToSend));

        messageInput.value = '';
      }
    }
  });

  //
  // WebSocket
  //

  let ws;
  let userInfo = {};
  let usersData = [];

  let webSocketConnect = (location) => {
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    ws = new window.WebSocket(location);

    ws.onopen = () => {
      showAuth();
    };

    ws.onmessage = (message) => {
      let data = JSON.parse(message.data);
      let user = data.userId ? usersData.find(elem => elem.userId === data.userId) || {} : {};

      if (data.type === 'user-join') {
        changeChatName(data.firstName, data.lastName);
        removeModal();
        showChatArea();

        userInfo = data;
      }

      if (data.type === 'users-list') {
        for (let i = 0, elem; i < data.count; ++i) {
          elem = data.users[i];

          let findUser = usersData.find(userData => userData.userId === elem.id);

          if (!findUser) { usersData.push(elem); }
        }

        renderUserListPanel({ users: usersData, count: usersData.length });
      }

      if (data.type === 'user-add') {
        usersData.push(data);

        renderUserListPanel({ users: usersData, count: usersData.length });
      }

      if (data.type === 'user-message') {
        let messageList = document.getElementById('messageList');

        data.time = parseTime(data.time);
        data.avatar = user.avatar || './img/avatar.png';

        messageList.innerHTML += messageRender(data);

        removeAnimation(data.messageId, 1070);
        listScrollToBottom(messageList);
      }

      if (data.type === 'user-avatar') {
        if (data.userId === userInfo.userId) { changeAvatar(data.data); }

        user['avatar'] = data.data;

        changeAvatarMessage(data.userId, data.data);
      }

      if (data.type === 'user-remove') {
        let indexDel = usersData.findIndex(elem => elem.userId === data.userId);

        if (indexDel !== undefined) { usersData.splice(indexDel, 1); }

        renderUserListPanel({ users: usersData, count: usersData.length });
      }
    };

    ws.onclose = () => {
      userInfo = {};
      usersData = [];

      hideChatArea();
      removeModal();

      // Try reconnect every 2.5 sec.
      setTimeout(function () { webSocketConnect(location); }, 2500);
    };
  };

  webSocketConnect('ws://192.168.0.100:8085');
}

(function () {
  window.addEventListener('DOMContentLoaded', load);
})();
