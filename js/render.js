'use strict';
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var typeOfHouse = document.getElementById('type').value;
var pin = [];
var map = document.querySelector('.map');
var mapPinsElement = map.querySelector('.map__pins');

var getInfoAboutPins = function (info) {
  var pinElement = pinsTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = info.author.avatar;
  pinElementImg.alt = info.offer.type;
  pinElement.style.left = info.location.x + 'px';
  pinElement.style.top = info.location.y + 'px';
  return pinElement;
};

var createPins = function (pins) {
  var takeNumber = pins.length > 5 ? 5 : pins.length;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < takeNumber; i++) {
    fragment.appendChild(getInfoAboutPins(pins[i]));
  }
  mapPinsElement.appendChild(fragment);
};

window.deletePins = function () {
  /* var samePins = pin.filter(function (it) {
    return it.offer.type === typeOfHouse;
  });

  var takeNumber = samePins.length > 5 ? 5 : samePins.length;
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < takeNumber; i++) {
    fragment.appendChild(getInfoAboutPins(samePins[i]));
  }
  mapPinsElement.removeChild(fragment); */
  while (mapPinsElement.firstChild) {
    mapPinsElement.removeChild(mapPinsElement.firstChild);
  }
};

window.updatePins = function () {
  var samePins = pin.filter(function (it) {
    return it.offer.type === typeOfHouse;
  });
  createPins(samePins);
};

window.createPinOnMap = function () {
  var successHandler = function (data) {
    pin = data;
    window.updatePins();
  };

  var onError = function () {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    var errorModule = errorBlock.cloneNode(true);
    map.appendChild(errorModule);
    var errorButton = map.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      location.reload();
    });
  };
  window.load(successHandler, onError);
};
