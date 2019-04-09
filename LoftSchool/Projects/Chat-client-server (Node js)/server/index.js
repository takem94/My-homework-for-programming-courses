'use strict';

const WebSocket = require('ws');
const WebSocketServer = new WebSocket.Server({ port: 8085 });

let usersArray = [];
let usersCounter = 0;
let messagesCounter = 0;

function onUserJoin (userIndex) {
  let users = [];

  for (let i = 0; i < usersArray.length; ++i) {
    let elem = usersArray[i];

    if (elem) {
      let temporalData = {
        fullName: `${elem.firstName} ${elem.lastName}`,
        firstName: elem.firstName,
        lastName: elem.lastName,
        userId: elem.id,
        avatar: '' || elem.avatar
      };

      users.push(temporalData);
    }
  }

  let dataToSend = {
    users: users,
    count: users.length,
    type: 'users-list'
  };

  if (usersArray[userIndex]) {
    usersArray[userIndex].connection.send(JSON.stringify(dataToSend));
  }
}

function broadcastMessage (data) {
  usersArray.forEach(user => {
    if (user && user.connection.readyState === WebSocket.OPEN) {
      user.connection.send(data);
    }
  });
}

WebSocketServer.on('connection', ws => {
  let userIndex;

  ws.on('message', mess => {
    let data;

    try {
      data = JSON.parse(mess);
    } catch (err) {
      data = { error: err, msg: err.message };
    }

    if (data.type === 'user-join' && userIndex === undefined) {
      userIndex = usersArray.push({ connection: ws }) - 1;

      usersArray[userIndex]['fullName'] = data.fullName;
      usersArray[userIndex]['firstName'] = data.firstName;
      usersArray[userIndex]['lastName'] = data.lastName;
      usersArray[userIndex]['id'] = data['userId'] = usersCounter++;

      // Return answer on request.
      ws.send(JSON.stringify(data));

      // Return all users list info to new user.
      onUserJoin(userIndex);

      // Return new user info to all users.
      data.type = 'user-add';

      usersArray.forEach(user => {
        if (user && user.id !== data.userId && user.connection.readyState === WebSocket.OPEN) {
          user.connection.send(JSON.stringify(data));
        }
      });
    }

    if (data.type === 'user-message' && userIndex !== undefined) {
      data['time'] = (new Date()).getTime();
      data['userId'] = usersArray[userIndex]['id'];
      data['messageId'] = messagesCounter++;

      broadcastMessage(JSON.stringify(data));
    }

    if (data.type === 'user-avatar' && userIndex !== undefined) {
      data['userId'] = usersArray[userIndex]['id'];

      usersArray[userIndex]['avatar'] = data.data;

      usersArray.forEach(user => {
        if (user && user.connection.readyState === WebSocket.OPEN) {
          user.connection.send(JSON.stringify(data));
        }
      });
    }
  });

  ws.on('error', (err) => {
    console.log('Class: , Line: 61 ', err);
  });

  ws.on('close', (connection) => {
    if (userIndex !== undefined) {
      console.log((new Date()) + ' Peer ' + usersArray[userIndex].fullName + ' disconnected.');
      // remove user from the list of connected clients

      let dataToSend = {
        type: 'user-remove',
        userId: usersArray[userIndex].id
      };

      delete usersArray[userIndex];

      broadcastMessage(JSON.stringify(dataToSend));
    }
  });
});
