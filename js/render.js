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
    switch (housingPriceType) {
      case 'any':
        break;
      case 'middle':
        filteredPinsByPrice = copy.filter(function (it) {
          return (it.offer.price >= 10000 && it.offer.price < 50000);
        });
        break;
      case 'low':
        filteredPinsByPrice = copy.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'high':
        filteredPinsByPrice = copy.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
    }
    return filteredPinsByPrice;
  };

  var filteringPinsByRooms = function (copy) {
    var housingRoomsType = housingRooms.value;
    var filteredPinsByRooms;
    switch (housingRoomsType) {
      case 'any':
        break;
      case '1':
        filteredPinsByRooms = copy.filter(function (it) {
          return it.offer.rooms === 1;
        });
        break;
      case '2':
        filteredPinsByRooms = copy.filter(function (it) {
          return it.offer.rooms === 2;
        });
        break;
      case '3':
        filteredPinsByRooms = copy.filter(function (it) {
          return it.offer.rooms === 3;
        });
        break;
    }
    return filteredPinsByRooms;
  };


  var filteringPinsByGuests = function (copy) {
    var housingGuestsType = housingGuests.value;
    var filteredPinsByGuests;
    switch (housingGuestsType) {
      case 'any':
        break;
      case '1':
        filteredPinsByGuests = copy.filter(function (it) {
          return it.offer.guests === 1;
        });
        break;
      case '2':
        filteredPinsByGuests = copy.filter(function (it) {
          return it.offer.guests === 2;
        });
        break;
      case '0':
        filteredPinsByGuests = copy.filter(function (it) {
          return it.offer.guests === 0;
        });
        break;
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
      deleteCard();
      var pinsCopy = pins.slice();
      window.render.deletePins();
      var filter = (filteringPinsByType(pinsCopy).concat(filteringPinsByPrice(pinsCopy)).concat(filteringPinsByRooms(pinsCopy)).concat(filteringPinsByGuests(pinsCopy)).concat(filteringPinsByFeatures(pinsCopy)));
      filter = filter.filter(function (x) {
        return x !== undefined && x !== null;
      });
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
