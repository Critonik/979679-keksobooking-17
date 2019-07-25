'use strict';
(function () {
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');


  var createPinsWithInfo = function (info) {
    var pinElement = pinsTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = info.author.avatar;
    pinElementImg.alt = info.offer.type;
    pinElement.style.left = info.location.x + 'px';
    pinElement.style.top = info.location.y + 'px';
    pinElement.setAttribute('data-key-pin-X', info.location.x);
    pinElement.setAttribute('data-key-pin-Y', info.location.y);
    return pinElement;
  };

  window.render = {
    pins: [],
    deletePins: function () {
      var deletedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < deletedPins.length; j++) {
        deletedPins[j].parentNode.removeChild(deletedPins[j]);
      }
    },
    updatePins: function () {
      window.card.addListenersOnPin(pinsCopy);
      var pinsCopy = window.render.pins.slice();
      window.card.deleteCard();
      window.render.deletePins();
      window.filter.filtering(pinsCopy);
      window.card.addListenersOnPin(pinsCopy);
    },
    onError: function (errorMessage) {
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      var errorModule = errorBlock.cloneNode(true);
      map.appendChild(errorModule);
      errorBlock.textContent = errorMessage;
      var errorButton = map.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        location.reload();
      });
    },
    createPinOnMap: function () {
      var successHandler = function (data) {
        window.render.pins = data;
        window.render.createPins(window.render.pins);
        window.card.addListenersOnPin(window.render.pins);
      };
      window.backend.load(successHandler, window.render.onError);
    },
    createPins: function (elem) {
      var takeNumber = elem.length > 5 ? 5 : elem.length;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(createPinsWithInfo(elem[i]));
      }
      mapPinsElement.appendChild(fragment);
    }
  };
})();
