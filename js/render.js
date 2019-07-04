'use strict';
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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
  var pisnToDelete = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var j = 0; j < pisnToDelete.length; j++) {
    if (pisnToDelete[j].className.toLowerCase() === 'map__pin') {
      pisnToDelete[j].parentNode.removeChild(pisnToDelete[j]);
    }
  }
};

window.updatePins = function () {
  var typeOfHouse = document.getElementById('type').value;
  var pinCopy = pin.slice();
  var samePins = pinCopy.filter(function (it) {
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
