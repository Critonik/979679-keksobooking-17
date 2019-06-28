'use strict';
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');
var address = document.getElementById('address');
var mapPinsElement = document.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var YMIN = 130;
var YMAX = 630;
var offersLoaded = false;

(function () {
  window.util.blockForm(adForm);
  window.util.blockForm(mapFilters);
})();

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

var createPinOnMap = function () {

  var renderPins = function (info) {
    var pinElement = pinsTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = info.author.avatar;
    pinElementImg.alt = info.offer.type;
    pinElement.style.left = info.location.x + 'px';
    pinElement.style.top = info.location.y + 'px';
    return pinElement;
  };

  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(renderPins(pins[i]));
    }
    mapPinsElement.appendChild(fragment);
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

var pinMove = function (evt) {
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

    if (!offersLoaded) {
      createPinOnMap();
    }

    offersLoaded = true;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    setAdress(mainPin);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };


  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

mainPin.addEventListener('mousedown', pinMove);
