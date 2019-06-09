'use strict';
document.querySelector('.map').classList.remove('map--faded');
var overlay = document.querySelector('.map__overlay');
var YMIN = 130;
var YMAX = 630;
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var setOffer = ['palace', 'flat', 'house', 'bungalo'];

var bookingInfo = [];
for (var i = 1; i <= 8; i++) {
  bookingInfo.push({
    author: 'img/avatars/user0' + i + '.png',
    offer: setOffer[getRandomInt(0, setOffer.length)],
    locationX: getRandomInt(0, overlay.offsetWidth),
    locationY: getRandomInt(YMIN, YMAX)
  });
}

var mapPinsElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

for (i = 1; i <= 8; i++) {
  var pinElement = pinsTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');
  pinElementImg.src = bookingInfo[i].author;
  pinElementImg.alt = bookingInfo[i].offer;
  pinElement.style.left = bookingInfo[i].locationX + 'px';
  pinElement.style.top = bookingInfo[i].locationY + 'px';
  mapPinsElement.appendChild(pinElement);
}
