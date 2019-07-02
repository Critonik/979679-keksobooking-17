'use strict';

window.createPinOnMap = function () {
  var pin = [];
  var map = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var typeOffer = document.querySelector('.map__pins').alt;
  var adForm = document.querySelector('.ad-form');
  var placeType = adForm.querySelector('#housing-type');

  var getInfoAboutPins = function (info) {
    var pinElement = pinsTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = info.author.avatar;
    pinElementImg.alt = info.offer.type;
    pinElement.style.left = info.location.x + 'px';
    pinElement.style.top = info.location.y + 'px';
    typeOffer = pinElementImg.alt;
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

  var updatePins = function (somePin) {
    var samePins = somePin.filter(function (it) {
      return it.offer.type === typeOffer;
    });
    createPins(samePins);
  };

  placeType.addEventListener('change', function (evt) {
    evt.preventDefault();
    updatePins(pin);
  });

  var successHandler = function (data) {
    pin = data;
    createPins(pin);
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
