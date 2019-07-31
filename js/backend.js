'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var SUCCCESS_ANSWER = 200;
  var TIMEOUT_DURATION = 10000;
  var mapFilters = document.querySelector('.map__filters');
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCCESS_ANSWER) {
          onLoad(xhr.response);
          window.util.unblockForm(mapFilters, 'disabled');
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

      xhr.timeout = TIMEOUT_DURATION; // 10s

      xhr.open('GET', LOAD_URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var submitButton = document.querySelector('.ad-form__submit');
      submitButton.setAttribute('disabled', true);

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка загрузки');
        submitButton.removeAttribute('disabled');
      });

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCCESS_ANSWER) {
          onLoad(xhr.response);
        } else {
          onError('Произошла ошибка загрузки');
        }
        submitButton.removeAttribute('disabled');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_DURATION; // 10s

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }
  };
})();
