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
var XMAX = 1100;
var XMIN = 100;
var MAP_XMIN = 10;
var setOffer = ['bungalo', 'flat', 'house', 'palace'];
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
  return Math.round(elem.getBoundingClientRect().y - (elem.offsetHeight / 2));
};

var getPinPositionLeft = function (el) {
  return Math.round(el.getBoundingClientRect().x - (el.offsetWidth / 2));
};

var setAdress = function () {
  address.value = getPinPositionLeft(mainPin) + ', ' + getPinPositionTop(mainPin);
};

setAdress();

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

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  deleteBlocking();
  createPinOnMap();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

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
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (mainPin.getBoundingClientRect().left > XMAX) {
      mainPin.style.left = XMAX + 'px';
    } else if (mainPin.getBoundingClientRect().left < XMIN) {
      mainPin.style.left = MAP_XMIN + 'px';
    }

    if (mainPin.getBoundingClientRect().top > YMAX) {
      mainPin.style.top = YMAX + 'px';
    } else if (mainPin.getBoundingClientRect().top < YMIN) {
      mainPin.style.top = YMIN + 'px';
    }

    setAdress();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var changePrice = function (select) {
  switch (select) {
    case setOffer[0]:
      priceInput.placeholder = '0';
      priceInput.min = '0';
      break;
    case setOffer[1]:
      priceInput.placeholder = '1000';
      priceInput.min = '1000';
      break;
    case setOffer[2]:
      priceInput.placeholder = '5000';
      priceInput.min = '5000';
      break;
    case setOffer[3]:
      priceInput.placeholder = '10000';
      priceInput.min = '10000';
      break;
  }
};

placeType.addEventListener('change', function (evt) {
  evt.preventDefault();
  var target = evt.target.value;
  changePrice(target);
});

var syncFirstTime = function (firstOption, firstOptionValue) {
  for (var j = 0; j < firstOption.length; j++) {
    if (firstOptionValue === departureTime[j].value) {
      departureTime.options[j].selected = true;
    }
  }
};

arrivalTime.addEventListener('change', function (e) {
  e.preventDefault();
  var first = e.target;
  var firstValue = e.target.value;
  syncFirstTime(first, firstValue);
});

var syncSecondTime = function (secondOption, secondOptionValue) {
  for (var k = 0; k < secondOption.length; k++) {
    if (secondOptionValue === arrivalTime[k].value) {
      arrivalTime.options[k].selected = true;
    }
  }
};

departureTime.addEventListener('change', function (ev) {
  ev.preventDefault();
  var second = ev.target;
  var secondValue = ev.target.value;
  syncSecondTime(second, secondValue);
});
