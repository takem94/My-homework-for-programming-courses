class ViewMap {
  constructor () {
    this.modalStatus = false; // false = hidden, true = shown
    this.idCounter = 0;

    this.modalElem = null;
    this.modalCloseBtn = null;
    this.modalAddress = null;
    this.formAddBtn = null;
    this.inputList = null;

    this.map = null;

    this._reviewContainer = null;
    this._reviewsTemplate = null;
  }

  init (map) {
    this.map = map;

    this.createModalTemplate();
    this.createReviewsTemplate();
  }

  initYmap () {
    return new Promise(resolve => {
      global.ymaps.ready(resolve);
    });
  }

  createModalTemplate () {
    let temp = document.querySelector('#modalTemplate');
    temp = global.Handlebars.compile(temp.innerHTML);

    this.modalElem = document.querySelector('#modal');
    this.modalElem.innerHTML += temp();
    this.modalElem = this.modalElem.firstElementChild;

    this.inputList = this.modalElem.querySelectorAll('input, textarea');

    this.formAddBtn = this.modalElem.querySelector('.review-modal__body-form-btn');
    this.modalCloseBtn = this.modalElem.querySelector('.review-modal__header-close');
    this.modalAddress = this.modalElem.querySelector('#modalAddress');
    this._reviewContainer = this.modalElem.querySelector('.reviews-list__container');
  }

  createReviewsTemplate () {
    this._reviewsTemplate = document.querySelector('#reviewListTemplate');
    this._reviewsTemplate = global.Handlebars.compile(this._reviewsTemplate.innerHTML);
  }

  renderReviews (items) {
    this._reviewContainer.innerHTML = this._reviewsTemplate(items);
    this.scrollReviewsToBottom();
  }

  renderReview (item) {
    if (this._reviewContainer.querySelector('.reviews-list__empty')) {
      this.renderReviews({ items: [item] });
    } else {
      this._reviewContainer.innerHTML += this._reviewsTemplate({ items: [item] });
      this.scrollReviewsToBottom();
    }
  }

  getClustererContentLayout () {
    return global.ymaps.templateLayoutFactory.createClass(
      '<h2 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h2>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );
  }

  getPointData (data) {
    data.id = this.idCounter;

    return {
      balloonContentHeader: `<font size=3><b>${data.place}</b></font>`,
      balloonContentBody: `<p style="margin: 0;"><a href="#" data-id-cluster="${this.idCounter++}" class="ballon-link">${data.address}</a></p><br>` +
            `<p style="margin: 0; word-break: break-word;">${data.message}</p>`,
      balloonContentFooter: `<font size=2><div style="position: relative; height: 18px;"><span style="position: absolute; right: 0;">${data.time}</span></div></font>`,
      clusterData: data
    };
  }

  scrollReviewsToBottom () {
    this._reviewContainer.parentElement.scrollTop = this._reviewContainer.parentElement.scrollHeight;
  }

  setEventOnElemClick (elem, func) {
    if (elem === '') { elem = document.body; } else if (typeof elem === 'string' && elem.length > 0) { elem = document.querySelector(elem); }

    elem.addEventListener('click', func);
  }

  setEvenOnYmapClick (ymap, func) {
    ymap.events.add('click', func);
  }

  changeAddress (string) {
    this.modalAddress.innerText = string;
  }

  changeMapBehavior (on) {
    this.map.behaviors[on](['drag', 'scrollZoom', 'dblClickZoom']);
  }

  changeModalState (changeBehavior, changeClass, changeStatus) {
    if (this.modalStatus !== changeStatus) {
      this.changeMapBehavior(changeBehavior);

      this.modalElem.classList[changeClass]('hide');
      this.modalStatus = changeStatus;
    }
  }

  changeModalPosition (x, y) {
    let modal = this.modalElem;

    let coordsModalY = modal.clientHeight + y;
    let coordsModalX = modal.clientWidth + x;

    if (coordsModalX > window.innerWidth) {
      coordsModalX = window.innerWidth - modal.clientWidth - 10;
    } else {
      coordsModalX = x;
    }

    if (coordsModalY > window.innerHeight) {
      coordsModalY = window.innerHeight - modal.clientHeight - 10;
    } else {
      coordsModalY = y;
    }

    modal.style.left = coordsModalX + 'px';
    modal.style.top = coordsModalY + 'px';
  }

  closeAllBallons (clusterer) {
    this.map.balloon.close();
    clusterer.balloon.close();
  }
}

export { ViewMap };
