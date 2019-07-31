'use strict';
(function () {
  var PIN_QUANTITY = 5;
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var pins = [];

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

  var renderErrorBlock = function (errorMessage) {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    var errorModule = errorBlock.cloneNode(true);
    map.appendChild(errorModule);
    errorBlock.textContent = errorMessage;
    var errorButton = map.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      location.reload();
    });
  };

  window.render = {
    deletePins: function () {
      var deletedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      deletedPins.forEach(function (elementToDel) {
        elementToDel.remove();
      });
    },
    updatePins: function () {
      var pinsCopy = pins.slice();
      window.card.delete();
      window.render.deletePins();
      window.filter.sortOut(pinsCopy);
    },
    createPinOnMap: function () {
      var onSuccess = function (data) {
        pins = data;
        window.render.createPins(pins);
        window.card.addListenersOnPin(pins);
      };
      window.backend.load(onSuccess, renderErrorBlock);
    },
    createPins: function (elem) {
      var takeNumber = elem.length > PIN_QUANTITY ? PIN_QUANTITY : elem.length;
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(createPinsWithInfo(elem[i]));
      }
      mapPinsElement.appendChild(fragment);
    }
  };
})();
