'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var address = document.getElementById('address');
var mapPinsElement = document.querySelector('.map__pins');
var setOffers = ['bungalo', 'flat', 'house', 'palace'];
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var YMIN = 130;
var YMAX = 630;

(function () {
  window.util.blockForm(adForm);
  window.util.blockForm(mapFilters);
})();

var bookingInfo = [];
for (var i = 1; i <= 8; i++) {
  bookingInfo.push({
    author: 'img/avatars/user0' + i + '.png',
    offer: setOffers[window.util.getRandomInt(0, setOffers.length)],
    locationX: window.util.getRandomInt(0, map.offsetWidth),
    locationY: window.util.getRandomInt(YMIN, YMAX)
  });
}

var renderPins = function (info) {
  var pinElement = pinsTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = info.author;
  pinElementImg.alt = info.offer;
  pinElement.style.left = info.locationX + 'px';
  pinElement.style.top = info.locationY + 'px';
  return pinElement;
};

var createPinOnMap = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 1; j < bookingInfo.length; j++) {
    fragment.appendChild(renderPins(bookingInfo[j]));
  }
  mapPinsElement.appendChild(fragment);
};

var getPinPositionTop = function (elem) {
  return elem.offsetTop + elem.offsetHeight;
};

var getPinPositionLeft = function (el) {
  return el.offsetLeft + (el.offsetWidth / 2);
};

var setAdress = function (element) {
  address.value = getPinPositionLeft(element) + ', ' + getPinPositionTop(element);
};

setAdress(mainPin);

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  window.util.unblockForm(adForm, 'disabled');
  window.util.unblockForm(mapFilters, 'disabled');

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    createPinOnMap();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';


    if (mainPin.offsetLeft > (map.offsetWidth - mainPin.offsetWidth)) {
      mainPin.style.left = (map.offsetWidth - mainPin.offsetWidth) + 'px';
    }
    if (mainPin.offsetLeft < 0) {
      mainPin.style.left = 0 + 'px';
    }

    if (mainPin.offsetTop > (YMAX - mainPin.offsetHeight)) {
      mainPin.style.top = (YMAX - mainPin.offsetHeight) + 'px';
    }
    if (mainPin.offsetTop < (YMIN - mainPin.offsetHeight)) {
      mainPin.style.top = (YMIN - mainPin.offsetHeight) + 'px';
    }

    setAdress(mainPin);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAdress(mainPin);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
