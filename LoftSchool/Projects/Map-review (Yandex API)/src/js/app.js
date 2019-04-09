import { ControllerMap } from './modules/ControllerMap';

function load () {
  let mapController = new ControllerMap();

  mapController
    .init()
    .then(() => {
      mapController.initListeners();
      mapController.initData();
    });
}

window.addEventListener('DOMContentLoaded', load);
