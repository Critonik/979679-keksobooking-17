'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var address = document.getElementById('address');
var mapPinsElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var YMIN = 130;
var YMAX = 630;
var setOffer = ['palace', 'flat', 'house', 'bungalo'];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getPinPositionTop = function (elem) {
  return Math.round(elem.getBoundingClientRect().top);
};

var getPinPositionLeft = function (el) {
  return Math.round(el.getBoundingClientRect().left);
};

mainPin.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  address.value = getPinPositionTop(mainPin) + ', ' + getPinPositionLeft(mainPin);
  var fragment = document.createDocumentFragment();
  for (i = 1; i < bookingInfo.length; i++) {
    fragment.appendChild(renderPins(bookingInfo[i]));
  }
  mapPinsElement.appendChild(fragment);
});

var bookingInfo = [];
for (var i = 1; i <= 8; i++) {
  bookingInfo.push({
    author: 'img/avatars/user0' + i + '.png',
    offer: setOffer[getRandomInt(0, setOffer.length)],
    locationX: getRandomInt(0, map.offsetWidth),
    locationY: getRandomInt(YMIN, YMAX)
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
