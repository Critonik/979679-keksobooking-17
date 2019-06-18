'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var address = document.getElementById('address');
var mapPinsElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var placeType = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');
var arrivalTime = adForm.querySelector('#timein');
var departureTime = adForm.querySelector('#timeout');
var YMIN = 130;
var YMAX = 630;
var setOffer = ['palace', 'flat', 'house', 'bungalo'];
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var formBlocking = function () {
  for (var i = 0; i < adForm.children.length; i++) {
    adForm.children[i].setAttribute('disabled', true);
  }
  for (i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].setAttribute('disabled', true);
  }
};

formBlocking();

var deleteBlocking = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < adForm.children.length; i++) {
    adForm.children[i].removeAttribute('disabled');
  }
  for (i = 0; i < mapFilters.children.length; i++) {
    mapFilters.children[i].removeAttribute('disabled');
  }
};

var getPinPositionTop = function (elem) {
  return Math.round(elem.getBoundingClientRect().top - (elem.offsetHeight) / 2);
};

var getPinPositionLeft = function (el) {
  return Math.round(el.getBoundingClientRect().left - (el.offsetWidth) / 2);
};

var setAdress = function () {
  address.value = getPinPositionTop(mainPin) + ', ' + getPinPositionLeft(mainPin);
};

setAdress();

mainPin.addEventListener('click', function () {
  deleteBlocking();
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

var createPinOnMap = function () {
  var fragment = document.createDocumentFragment();
  for (i = 1; i < bookingInfo.length; i++) {
    fragment.appendChild(renderPins(bookingInfo[i]));
  }
  mapPinsElement.appendChild(fragment);
};

mainPin.addEventListener('mouseup', function () {
  setAdress();
  createPinOnMap();
});

var changeMinPrice = function () {
  if (placeType.selectedIndex === 0) {
    priceInput.placeholder = '0';
    priceInput.min = '0';
  } else if (placeType.selectedIndex === 1) {
    priceInput.placeholder = '1000';
    priceInput.min = '1000';
  } else if (placeType.selectedIndex === 2) {
    priceInput.placeholder = '5000';
    priceInput.min = '5000';
  } else if (placeType.selectedIndex === 3) {
    priceInput.placeholder = '10000';
    priceInput.min = '10000';
  }
};

placeType.addEventListener('input', function () {
  changeMinPrice();
});

var syncTime = function () {
  for (var j = 0; j <= arrivalTime.options.length; j++) {
    var arrival = arrivalTime.options[j];
    var departure = departureTime.options[j];
    if (arrival[j].selected) {
      departure[j].selected;
    }
  }
};

arrivalTime.addEventListener('click', function () {
  syncTime();
});
