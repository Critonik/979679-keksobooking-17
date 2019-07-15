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

  var filteringPinsByType = function (copy) {
    var typeOfHouse = housingType.value;
    var filteredPins;
    if (typeOfHouse !== 'any') {
      filteredPins = copy.filter(function (it) {
        return it.offer.type === typeOfHouse;
      });
    }
    return filteredPins;
  };

  var filteringPinsByPrice = function (copy) {
    var housingPriceType = housingPrice.value;
    var filteredPinsByPrice;
    if (housingPriceType !== 'any') {
      filteredPinsByPrice = copy.filter(function (it) {
        return it.offer.price === housingPriceType;
      });
    }
    return filteredPinsByPrice;
  };

  var filteringPinsByRooms = function (copy) {
    var housingRoomsType = housingRooms.value;
    var filteredPinsByRooms;
    if (housingRoomsType !== 'any') {
      filteredPinsByRooms = copy.filter(function (it) {
        return it.offer.rooms === housingRoomsType;
      });
    }
    return filteredPinsByRooms;
  };


  var filteringPinsByGuests = function (copy) {
    var housingGuestsType = housingGuests.value;
    var filteredPinsByGuests;
    if (housingGuestsType !== 'any') {
      filteredPinsByGuests = copy.filter(function (it) {
        return it.offer.guests === housingGuestsType;
      });
    }
    return filteredPinsByGuests;
  };

  var filteringPinsByFeatures = function (copy) {
    var housingFeaturesArray = housingFeatures.querySelectorAll('input[name="features"]:checked');
    var features = Array.from(housingFeaturesArray);
    var selectedFeatureValues = features.map(function (it) {
      return it.value;
    });

    var filteredPinsByFeatures;
    filteredPinsByFeatures = copy.filter(function (it) {
      return it.offer.features === selectedFeatureValues;
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
      deleteCard();
      var pinsCopy = pins.slice();
      window.render.deletePins();
      var filter = (filteringPinsByType(pinsCopy).concat(filteringPinsByPrice(pinsCopy)).concat(filteringPinsByRooms(pinsCopy)).concat(filteringPinsByGuests(pinsCopy)).concat(filteringPinsByFeatures(pinsCopy)));
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

})();
