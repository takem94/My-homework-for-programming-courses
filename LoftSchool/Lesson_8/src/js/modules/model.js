let Model = {
  login (appId, perms) {
    return new Promise(function (resolve, reject) {
      global.VK.init({
        apiId: appId
      });

      global.VK.Auth.login(function (response) {
        if (response.session) {
          resolve(response);
        } else {
          reject(new Error('Не удалось авторизоваться'));
        }
      }, perms);
    });
  },

  callApi (method, params) {
    params.v = '5.92';

    return new Promise(function (resolve, reject) {
      global.VK.api(method, params, function (response) {
        if (response.error) {
          reject(new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      });
    });
  },

  getUser () {
    return this.callApi('users.get', {});
  },

  getFriends () {
    return this.callApi('friends.get', { fields: 'photo_100' });
  },

  getNews () {
    return this.callApi('newsfeed.get', { filters: 'post', count: 20 });
  },

  getGroups () {
    return this.callApi('groups.get', { extended: 1 });
  },

  getAlbums () {
    return this.callApi('photos.getAlbums', { count: 6, 'need_system': 1 });
  },

  getPhotos (albumId) {
    return this.callApi('photos.get', { extended: 1, rev: 1, 'album_id': albumId, count: 6 })
      .then(function (photos) {
        return new Promise((resolve) => {
          photos.items.forEach(elem => { elem['photo_300'] = elem.sizes[3].url; });

          setTimeout(() => { resolve(photos); }, 350);
        });
      });
  },

  getComments (id) {
    return this.callApi('photos.getComments', { sort: 'asc', 'photo_id': id, extended: 1, fields: 'photo_50' })
      .then(function (comments) {
        comments.items.forEach(elem => {
          for (let i = 0; i < comments.profiles.length; ++i) {
            if (parseInt(elem['from_id']) === parseInt(comments.profiles[i].id)) {
              elem['photo_50'] = comments.profiles[i]['photo_50'];
              elem['full_name'] = comments.profiles[i]['first_name'] + ' ' + comments.profiles[i]['last_name'];
              break;
            }
          }
        });
        return comments;
      });
  },

  sortPhotos (photos, by) {
    function forElem (elem) {
      elem.items.sort((a, b) => {
        [a, b] = [a[by], b[by]];
        // It's expensive condition, but more elegant and short.
        if (by !== 'date') { [a, b] = [a.count, b.count]; }

        if (a > b) { return -1; } else if (a < b) { return 1; }

        return 0;
      });
    }

    photos.items.forEach(forElem);

    return photos;
  }
};

export { Model };

// задача - получение данных
