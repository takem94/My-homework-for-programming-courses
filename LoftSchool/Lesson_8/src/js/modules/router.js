import { Controller } from './controller';

let Router = {
  handle (route, params) {
    let routeName = route + 'Route';

    Controller[routeName](params);
  }
};

export { Router };

// задача - вызов методов контроллера (вызов action)
