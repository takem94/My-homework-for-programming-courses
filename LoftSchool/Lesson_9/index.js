const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  console.log('Запрос на страницу: ', req.url);

  if (req.url === '/getDirContent' && req.method === 'POST') {
    let body = [];
    let filePath;

    let reqResult = new global.Promise((resolve) => {
      req.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        resolve(body);
      });
    });

    reqResult
      .then((data) => {
        filePath = '.' + data.path;

        return new global.Promise((res, rej) => {
          fs.lstat(filePath, (err, data) => {
            err ? rej(new Error('file not found')) : res(data);
          });
        });
      })
      .then((data) => {
        if (data.isDirectory()) {
          return asyncDirectory(filePath, []).then((arr) => {
            let result = [{ path: filePath, name: req.url, type: 'directory', subFiles: arr }];
            sumSize(result);
            printArr(arr, '');

            res.end(JSON.stringify(result));
          });
        }
      })
      .catch((err) => {
        res.end(JSON.stringify({ error: err }));
        console.error(err.message);
      });
  } else if (req.url === '/main.css') {
    let filePath = '.' + req.url;

    let mainCss = new global.Promise((res, rej) => {
      fs.readFile(filePath, (err, data) => {
        err ? rej(new Error(err)) : res(data);
      });
    });

    mainCss
      .then((data) => {
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
      })
      .catch(err => console.log('Class: , Line: 56 ', err.message));
  } else {
    let index = new global.Promise((res, rej) => {
      fs.readFile('./index.html', (err, data) => {
        err ? rej(new Error(err)) : res(data);
      });
    });

    index
      .then((data) => { res.end(data); })
      .catch(err => console.log('Class: , Line: 66 ', err.message));
  }
}).listen(3005);

// Примичание: использование промисов и ассинхроности существенно увеличивает количество строк кода, что создает
// некоторые неудобоства, возможно это свяазано с использованием не очень современных методов и библиотек node.js.

function syncDirectory (path, arr) {
  arr = arr || [];

  let items = fs.readdirSync((path[1] === '/' && path[path.length - 1] === '/') ? path : path + '/');

  for (let i = 0; i < items.length; ++i) {
    let filePath = ((path[1] === '/' && path[path.length - 1] === '/') ? path : path + '/') + items[i];
    let file = fs.lstatSync(filePath);
    let objToAdd = {};

    if (file.isDirectory()) {
      objToAdd = { name: items[i], path: filePath, type: 'directory', subFiles: syncDirectory(filePath, []) };
    } else {
      objToAdd = { name: items[i], type: 'file', sizeKb: (file.size / 1000) + ' kb', size: file.size };
    }

    arr.push(objToAdd);
  }

  return arr;
}

function asyncDirectory (path, arr) {
  arr = arr || [];

  let items = new global.Promise((resolve, reject) => {
    let newPath = (path[1] === '/' && path[path.length - 1] === '/') ? path : path + '/';

    fs.readdir(newPath, (err, data) => {
      err ? reject(new Error(err)) : resolve(data);
    });
  });

  return items.then((items) => {
    return new global.Promise((resolve) => {
      let promiseArr = [];

      for (let i = 0; i < items.length; ++i) {
        let filePath = ((path[1] === '/' && path[path.length - 1] === '/') ? path : path + '/') + items[i];

        let file = new global.Promise((resolve, reject) => {
          fs.lstat(filePath, (err, data) => {
            err ? reject(new Error(err)) : resolve(data);
          });
        }).then((file) => {
          let objToAdd = {};

          if (file.isDirectory()) {
            return asyncDirectory(filePath, []).then((array) => {
              objToAdd = { name: items[i], path: filePath, type: 'directory', subFiles: array };
              arr.push(objToAdd);
            });
          } else {
            objToAdd = { name: items[i], type: 'file', sizeKb: (file.size / 1000) + ' kb', size: file.size };
            arr.push(objToAdd);
          }
        });

        promiseArr.push(file);
      }

      global.Promise.all(promiseArr).then(() => {
        return resolve(arr);
      });
    });
  }).catch((err) => console.error(err.message));
}

function sumSize (arr, sum) {
  sum = sum || 0;

  arr.forEach(elem => {
    if (!elem.sizeKb && !elem.size) {
      elem.size = sumSize(elem.subFiles, 0);
      elem.sizeKb = sumSize(elem.subFiles, 0) / 1000 + ' kb';
    } else {
      sum += elem.size;
    }
  });

  return sum;
}

function printArr (arr, pref) {
  arr.forEach(elem => {
    console.log(pref + ' ' + elem.name + ' (' + elem.type + ') (' + (elem.sizeKb || 0) + ')');

    if (elem.type === 'directory') { printArr(elem.subFiles, pref + '-'); }
  });
}
