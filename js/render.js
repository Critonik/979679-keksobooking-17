'use strict';
(function () {
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = [];
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var housingType = map.querySelector('#housing-type');

  var setInfoAboutPins = function (info) {
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

  var createPins = function (pins) {
    var takeNumber = pins.length > 5 ? 5 : pins.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(setInfoAboutPins(pins[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  window.deletePins = function () {
    var pisnToDelete = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pisnToDelete.length; j++) {
      pisnToDelete[j].parentNode.removeChild(pisnToDelete[j]);
    }
  };

  window.updatePins = function (type) {
    var pinCopy = pin.slice();
    createPins(pinCopy);
    var filteredPins;
    if (type !== 'any') {
      filteredPins = pinCopy.filter(function (it) {
        return it.offer.type === type;
      });
      window.deletePins();
      createPins(filteredPins);
    }
    window.addListenersOnPin(pinCopy);
  };

  window.createPinOnMap = function () {
    var successHandler = function (data) {
      var typeOfHouse = document.getElementById('housing-type').value;
      pin = data;
      window.debounce(function () {
        window.updatePins(typeOfHouse);
      });
    };

    window.onError = function () {
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      var errorModule = errorBlock.cloneNode(true);
      map.appendChild(errorModule);
      var errorButton = map.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        location.reload();
      });
    };
    window.load(successHandler, window.onError);
  };

  housingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    var typeOfHouse = document.getElementById('housing-type').value;
    window.debounce(function () {
      window.updatePins(typeOfHouse);
    });
  });
})();
