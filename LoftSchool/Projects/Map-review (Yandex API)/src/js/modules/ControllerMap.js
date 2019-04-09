import { ModelMap } from './ModelMap';
import { ViewMap } from './ViewMap';

class ControllerMap {
  constructor () {
    this.data = null;

    this.ModelMap = new ModelMap();
    this.ViewMap = new ViewMap();
  }

  init () {
    return new Promise(resolve => {
      this.ViewMap.initYmap()
        .then(() => { this.ViewMap.init(this.ModelMap.createMap()); })
        .then(() => {
          this.ModelMap.createClusterer(this.ViewMap.getClustererContentLayout());
          this.ModelMap.addClusterer(this.ViewMap.map);

          resolve();
        });
    });
  }

  initListeners () {
    this.ViewMap.setEvenOnYmapClick(this.ViewMap.map, this.onMapClick.bind(this));
    this.ViewMap.setEventOnElemClick(this.ViewMap.modalCloseBtn, this.onModalCloseClick.bind(this));
    this.ViewMap.setEventOnElemClick(this.ViewMap.formAddBtn, this.onReviewAdd.bind(this));
    this.ViewMap.setEvenOnYmapClick(this.ModelMap.clusterer, this.onClusterClick.bind(this));
    this.ViewMap.setEventOnElemClick('', this.onLinkBalloonClick.bind(this));
    this.ViewMap.setEventOnElemClick('#saveDataBtn', this.onSaveClick.bind(this));
    this.ViewMap.setEventOnElemClick('#delDataBtn', this.onDelClick.bind(this));
  }

  initData () {
    let data = this.ModelMap.getSavedData();
    data.forEach(elem => { this.ModelMap.addCluster(this.ViewMap.getPointData(elem), elem.coords); });
  }

  async onMapClick (e) {
    if (this.ViewMap.modalStatus) { return null; }

    try {
      let addressResult = await this.ModelMap.getGeoAddress(this.ModelMap.getGeoCoordsFromEvent(e));

      this.ViewMap.closeAllBallons(this.ModelMap.clusterer);

      this.ViewMap.changeAddress(addressResult);
      this.ViewMap.changeModalPosition(...e.get('clientPixels'));

      this.ViewMap.renderReviews();
      this.ViewMap.changeModalState('disable', 'remove', true);
    } catch (err) {
      console.error('Ошибка при обработке клика.');
      console.error(err.message);
    }
  }

  onSaveClick () {
    this.ModelMap.saveData();
  }

  onDelClick () {
    this.ModelMap.cleanData();
  }

  onModalCloseClick () {
    this.ViewMap.changeModalState('enable', 'add', false);
  }

  onReviewAdd () {
    let review = this.ModelMap.getDataFromForm(this.ViewMap.inputList);

    this.ModelMap.addCluster(this.ViewMap.getPointData(review));
    this.ViewMap.renderReview(review);

    this.ModelMap.saveData();
  }

  onClusterClick (e) {
    this.ViewMap.changeModalState('enable', 'add', false);

    let data = this.ModelMap.getGeoObjectsFromEvent(e);
    this.ModelMap.getDataFromGeoObjects(data);
  }

  onLinkBalloonClick (e) {
    if (e.target.classList.contains('ballon-link')) {
      e.preventDefault();

      this.ModelMap.filterDataByCoords(parseInt(e.target.dataset.idCluster));

      this.ViewMap.closeAllBallons(this.ModelMap.clusterer);

      this.ViewMap.renderReviews({ items: this.ModelMap.lastData });

      this.ViewMap.changeAddress(this.ModelMap.lastAddress);
      this.ViewMap.changeModalPosition(e.pageX, e.pageY);
      this.ViewMap.changeModalState('disable', 'remove', true);
    }
  }
}

export { ControllerMap };
