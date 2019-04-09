import { View } from './view';
import { Model } from './model';

let Controller = {
  lastPhotos: null,

  friendsRoute () {
    View.results.innerHTML = View.render('loader');

    return Model.getFriends().then(function (friends) {
      View.results.innerHTML = View.render('friends', friends);
    });
  },

  newsRoute () {
    View.results.innerHTML = View.render('loader');

    return Model.getNews().then(function (news) {
      View.results.innerHTML = View.render('news', { list: news.items });
    });
  },

  groupsRoute () {
    View.results.innerHTML = View.render('loader');

    return Model.getGroups().then(function (groups) {
      View.results.innerHTML = View.render('groups', groups);
    });
  },

  photosRoute () {
    View.results.innerHTML = View.render('loader');

    return Model.getAlbums()
      .then(albums => {
        let promises = [];

        albums.items.forEach((item) => {
          let promise = () => {
            return Model.getPhotos(item['id']).then(response => { item.items = response.items; });
          };
          promises.push(promise);
        });

        let res = Promise.resolve();

        promises.forEach((item) => { res = res.then(item); });

        return res.then(() => { return albums; });
      })
      .then(function (albums) {
        for (let i = albums.items.length - 1; i >= 0; --i) {
          if (albums.items[i].items.length === 0) {
            albums.items.splice(i, 1);
          }
        }

        this.lastPhotos = albums;
        View.results.innerHTML = View.render('photos', albums);
      }.bind(this));
  },

  commentsRoute (params) {
    return Model.getComments(params.id).then(function (comments) {
      params.elem.innerHTML = View.render('comments', comments);
    });
  },

  sortRoute (params) {
    let result = Model.sortPhotos(this.lastPhotos, params.by);
    View.results.innerHTML = View.render('photos', result);
  }

};

export { Controller };

// задача - прослойка между model и view
