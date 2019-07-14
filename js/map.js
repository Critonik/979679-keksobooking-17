'use strict';
(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var address = document.getElementById('address');
  var YMIN = 130;
  var YMAX = 630;
  var offersLoaded = false;
  window.util.blockForm(adForm);
  window.util.blockForm(mapFilters);

  var getPinPositionTop = function (elem) {
    return elem.offsetTop + elem.offsetHeight;
  };

  var getPinPositionLeft = function (elem) {
    return elem.offsetLeft + (elem.offsetWidth / 2);
  };

  window.map = {
    setAdress: function (element) {
      address.value = getPinPositionLeft(element) + ', ' + getPinPositionTop(element);
    }
  };

  window.map.setAdress(mainPin);


  var observeMovePin = function (evt) {
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

      window.map.setAdress(mainPin);

      if (!offersLoaded) {
        window.render.createPinOnMap();
      }

      offersLoaded = true;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.map.setAdress(mainPin);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', observeMovePin);
})();
