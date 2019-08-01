'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var SUCCCESS_ANSWER = 200;
  var ERROR_ANSWER = 500;
  var TIMEOUT_DURATION = 10000;
  var mapFilters = document.querySelector('.map__filters');
  var blockButton = function () {
    var submitButton = document.querySelector('.ad-form__submit');
    submitButton.setAttribute('disabled', true);
  };

  var unblockButton = function () {
    var submitButton = document.querySelector('.ad-form__submit');
    submitButton.removeAttribute('disabled');
  };

  var loadCondition = function (request, onLoad, onError) {
    if (request.status === SUCCCESS_ANSWER) {
      onLoad(request.response);
    } else if (request.status === ERROR_ANSWER) {
      onError('Ошибка загрузки ' + request.status);
    } else {
      onError('Произошла ошибка загрузки');
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        loadCondition(xhr, onLoad, onError);
        window.util.unblockForm(mapFilters, 'disabled');
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
      blockButton();
      xhr.addEventListener('error', function () {
        onError('Ошибка загрузки ' + xhr.status);
        unblockButton();
      });

      xhr.addEventListener('load', function () {
        loadCondition(xhr, onLoad, onError);
        unblockButton();
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
