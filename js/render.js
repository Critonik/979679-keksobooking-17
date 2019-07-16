'use strict';
(function () {
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = [];
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var housingType = map.querySelector('#housing-type');
  var housingPrice = map.querySelector('#housing-price');
  var housingRooms = map.querySelector('#housing-rooms');
  var housingGuests = map.querySelector('#housing-guests');
  var housingFeatures = map.querySelector('#housing-features');


  var createPinsWithInfo = function (info) {
    var pinElement = pinsTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = info.author.avatar;
    pinElementImg.alt = info.offer.type;
    pinElement.style.left = info.location.x + 'px';
    pinElement.style.top = info.location.y + 'px';
    pinElement.setAttribute('data-key-pin-X', info.location.x);
    pinElement.setAttribute('data-key-pin-Y', info.location.y);
    return pinElement;
  };

  var PricesFuncMin = {
    middle: 10000,
    low: null,
    high: 50000
  };

  var PricesFuncMax = {
    middle: 50000,
    low: 10000,
    high: null
  };

  var RoomQuantity = {
    1: 1,
    2: 2,
    3: 3
  };

  var GuestQuantity = {
    1: 1,
    2: 2,
    0: 0
  };

  var deleteCard = function () {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      popupCard.classList.add('hidden');
    }
    return;
  };

  var createPins = function (elem) {
    var takeNumber = elem.length > 5 ? 5 : elem.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPinsWithInfo(elem[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var filteringPinsByFeatures = function (copy) {
    var housingFeaturesArray = housingFeatures.querySelectorAll('input[name="features"]:checked');
    var features = Array.from(housingFeaturesArray);
    var selectedFeatureValues = features.map(function (it) {
      return it.value;
    });

    var filteredPinsByFeatures;
    filteredPinsByFeatures = copy.filter(function (it) {
      return it.offer.features === selectedFeatureValues; // и тут я затупил
    });
    return filteredPinsByFeatures;
  };

  window.render = {
    deletePins: function () {
      var deletedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < deletedPins.length; j++) {
        deletedPins[j].parentNode.removeChild(deletedPins[j]);
      }
    },
    updatePins: function () {
      var pinsCopy = pins.slice();
      deleteCard();
      window.render.deletePins();
      var filter = pinsCopy.filter(function (it) {
        if (housingType.value !== 'any') {
          return it.offer.type === housingType.value;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var housingPriceType = housingPrice.value;
        if (housingPriceType !== 'any') {
          if (housingPriceType === 'high') {
            return it.offer.price >= PricesFuncMin[housingPriceType];
          }
          return (it.offer.price >= PricesFuncMin[housingPriceType] && it.offer.price < PricesFuncMax[housingPriceType]);
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var housingRoomsType = housingRooms.value;
        if (housingRoomsType !== 'any') {
          return it.offer.rooms === RoomQuantity[housingRoomsType];
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var housingGuestsValue = housingGuests.value;
        if (housingGuestsValue !== 'any') {
          return it.offer.guests === GuestQuantity[housingGuestsValue];
        }
        return pinsCopy;
      })
      /* .filter(getFeaturesFilterChange(wifiFilter, 'wifi'))
       .filter(getFeaturesFilterChange(dishwasherFilter, 'dishwasher'))
      .filter(getFeaturesFilterChange(parkingFilter, 'parking'))
      .filter(getFeaturesFilterChange(washerFilter, 'washer'))
      .filter(getFeaturesFilterChange(elevatorFilter, 'elevator'))
      .filter(getFeaturesFilterChange(conditionerFilter, 'conditioner'))*/;

      createPins(filter);
      window.card.addListenersOnPin(pinsCopy);
    },
    onError: function (errorMessage) {
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      var errorModule = errorBlock.cloneNode(true);
      map.appendChild(errorModule);
      errorBlock.textContent = errorMessage;
      var errorButton = map.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        location.reload();
      });
    },
    createPinOnMap: function () {
      var successHandler = function (data) {
        pins = data;
        createPins(pins);
        window.card.addListenersOnPin(pins);
      };
      window.backend.load(successHandler, window.render.onError);
    }
  };

  housingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.debounce(function () {
      window.render.updatePins();
    });
  });

  housingPrice.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.debounce(function () {
      window.render.updatePins();
    });
  });

  housingRooms.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.debounce(function () {
      window.render.updatePins();
    });
  });

  housingGuests.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.debounce(function () {
      window.render.updatePins();
    });
  });

})();
