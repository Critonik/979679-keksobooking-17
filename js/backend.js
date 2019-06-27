'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';


    xhr.addEventListener('error', function () {
      onError('Произошла ошибка загрузки');
    });

    xhr.open('POST', URL);
    xhr.send(data);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
  };
})();

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();
