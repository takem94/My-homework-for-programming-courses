class ModelMap {
  constructor () {
    this.clusterer = null;
    this.lastCoords = null;
    this.lastAddress = null;
    this.lastData = null;
  }

  createMap () {
    return new global.ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 10,
      behaviors: ['default', 'scrollZoom'],
      controls: []
    });
  }

  createClusterer (contentLayout) {
    this.clusterer = new global.ymaps.Clusterer({
      preset: 'islands#invertedVioletClusterIcons',
      clusterBalloonContentLayout: 'cluster#balloonCarousel',
      clusterBalloonItemContentLayout: contentLayout,
      clusterBalloonPanelMaxMapArea: 0,
      groupByCoordinates: false,
      clusterDisableClickZoom: true,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false,
      clusterBalloonPagerSize: 5,
      clusterBalloonContentLayoutHeight: 250,
      clusterBalloonContentLayoutWidth: 250,
      gridSize: 80
    });

    return this.clusterer;
  }

  addClusterer (map) {
    map.geoObjects.add(this.clusterer);
  }

  addCluster (data, coords) {
    coords = coords || this.lastCoords;
    this.clusterer.add(new global.ymaps.Placemark(coords, data, this.getPointOptions()));
  }

  getDataFromForm (inputs) {
    let status = 0;
    let dateStamp = new Date();
    let data = {
      time: dateStamp.toLocaleDateString() + ' ' + dateStamp.toLocaleTimeString(),
      address: this.lastAddress,
      coords: this.lastCoords
    };

    inputs.forEach(input => {
      if (input.value.length > 2) {
        data[input.name] = input.value;
        status++;
      }
    });

    if (status === inputs.length) {
      inputs.forEach(input => { input.value = ''; });
      return data;
    } else {
      window.alert('Заполните все поля!');
    }
  }

  getPointOptions () {
    return { preset: 'islands#violetIcon' };
  }

  getGeoObjectsFromEvent (event) {
    this.lastData = event.get('target');

    let geoObjects = this.lastData.properties.get('geoObjects');
    // Check on balloons collection or single place-mark.
    this.lastData = geoObjects || [this.lastData];

    return this.lastData;
  }

  getDataFromGeoObjects (geoObjects) {
    let dataArray = [];
    // Fill array by inner data of each element
    for (let i = 0; i < geoObjects.length; ++i) {
      dataArray.push(geoObjects[i].properties.get('clusterData'));
    }
    this.lastData = dataArray;

    return this.lastData;
  }

  getGeoCoordsFromEvent (event) {
    this.lastCoords = event.get('coords');
    return this.lastCoords;
  }

  getGeoAddress (coords) {
    return new Promise(resolve => {
      global.ymaps.geocode(coords).then((data) => {
        this.lastAddress = data.geoObjects.get(0).properties.get('text');
        resolve(this.lastAddress);
      });
    });
  }

  filterDataByCoords (id) {
    let data = this.lastData; let newData = []; let coords; let title;

    for (let i = 0; i < this.lastData.length; ++i) {
      if (!title && data[i].id === id) {
        title = data[i].address;
        coords = data[i].coords;
        i = 0;
      }

      if (coords && coords[0] === data[i].coords[0] && coords[1] === data[i].coords[1]) {
        newData.push(data[i]);
      }
    }

    this.lastData = newData;

    if (title && coords) {
      this.lastAddress = title;
      this.lastCoords = coords;
    }

    return this.lastData;
  }

  saveData () {
    let tempData = this.lastData;

    let allData = this.clusterer.getGeoObjects();
    this.getDataFromGeoObjects(allData);
    global.localStorage['mapBalloonsData'] = JSON.stringify(this.lastData);

    this.lastData = tempData;
  }

  cleanData () {
    global.localStorage['mapBalloonsData'] = '';
    this.clusterer.removeAll();
  }

  getSavedData () {
    return global.localStorage['mapBalloonsData'] ? JSON.parse(global.localStorage['mapBalloonsData']) : [];
  }
}

export { ModelMap };
