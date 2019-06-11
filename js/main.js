'use strict';
document.querySelector('.map').classList.remove('map--faded');
var overlay = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var YMIN = 130;
var YMAX = 630;
var setOffer = ['palace', 'flat', 'house', 'bungalo'];
var fragment = document.createDocumentFragment();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var bookingInfo = [];
for (var i = 1; i <= 8; i++) {
  bookingInfo.push({
    author: 'img/avatars/user0' + i + '.png',
    offer: setOffer[getRandomInt(0, setOffer.length)],
    locationX: getRandomInt(0, overlay.offsetWidth),
    locationY: getRandomInt(YMIN, YMAX)
  });
}

var renderPins = function (info) {
  if (info === null) {
    console.log(null);
  }
  var pinElement = pinsTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = info.author;
  pinElementImg.alt = info.offer;
  pinElement.style.left = info.locationX + 'px';
  pinElement.style.top = info.locationY + 'px';
  return pinElement;
};

for (i = 1; i < bookingInfo.length; i++) {
  fragment.appendChild(renderPins(bookingInfo[i]));
}
mapPinsElement.appendChild(fragment);
