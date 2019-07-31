'use strict';

(function () {
  var map = document.querySelector('.map');
  var housingType = map.querySelector('#housing-type');
  var housingPrice = map.querySelector('#housing-price');
  var housingRooms = map.querySelector('#housing-rooms');
  var housingGuests = map.querySelector('#housing-guests');
  var housingFeatures = map.querySelector('#housing-features');
  var checkWifi = housingFeatures.querySelector('input[value="wifi"]');
  var checkDishwasher = housingFeatures.querySelector('input[value="dishwasher"]');
  var checkParking = housingFeatures.querySelector('input[value="parking"]');
  var checkWasher = housingFeatures.querySelector('input[value="washer"]');
  var checkElevator = housingFeatures.querySelector('input[value="elevator"]');
  var checkConditioner = housingFeatures.querySelector('input[value="conditioner"]');

  var PricesFuncMin = {
    MIDDLE: 10000,
    LOW: null,
    HIGH: 50000
  };

  var PricesFuncMax = {
    MIDDLE: 50000,
    LOW: 10000,
    HIGH: null
  };

  housingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.render.updatePins();
  });


  housingPrice.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.render.updatePins();
  });

  housingRooms.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.render.updatePins();
  });

  housingGuests.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.render.updatePins();
  });

  var addListenerOnCheckbox = function () {
    var housingFeaturesArray = housingFeatures.querySelectorAll('input[name="features"]');
    housingFeaturesArray.forEach(function (input) {
      input.addEventListener('change', function (evt) {
        evt.preventDefault();
        window.render.updatePins();
      });
    });
  };
  addListenerOnCheckbox();

  var checkingHouseType = function (it) {
    return housingType.value !== 'any' ? it.offer.type === housingType.value : it;
  };

  var checkingHousePrice = function (it) {
    if (housingPrice.value !== 'ANY') {
      if (housingPrice.value === 'HIGH') {
        return it.offer.price >= PricesFuncMin[housingPrice.value];
      }
      return (it.offer.price >= PricesFuncMin[housingPrice.value] && it.offer.price < PricesFuncMax[housingPrice.value]);
    }
    return it;
  };

  var checkingHouseRooms = function (it) {
    return housingRooms.value !== 'any' ? it.offer.rooms === +housingRooms.value : it;
  };

  var chekingHouseGuests = function (it) {
    if (housingGuests.value !== 'any') {
      if (housingGuests.value === '0') {
        return it.offer.guests === +housingGuests.value;
      }
      return it.offer.guests >= +housingGuests.value;
    }
    return it;
  };

  var checkingHouseWifi = function (it) {
    return checkWifi.checked ? it.offer.features.indexOf(checkWifi.value) >= 0 : it;
  };

  var checkingHouseDishwasher = function (it) {
    return checkDishwasher.checked ? it.offer.features.indexOf(checkDishwasher.value) >= 0 : it;
  };

  var checkingHouseParking = function (it) {
    return checkParking.checked ? it.offer.features.indexOf(checkParking.value) >= 0 : it;
  };

  var checkingHouseWasher = function (it) {
    return checkWasher.checked ? it.offer.features.indexOf(checkWasher.value) >= 0 : it;
  };

  var checkingHouseElevator = function (it) {
    return checkElevator.checked ? it.offer.features.indexOf(checkElevator.value) >= 0 : it;
  };

  var checkingHouseConditioner = function (it) {
    return checkConditioner.checked ? it.offer.features.indexOf(checkConditioner.value) >= 0 : it;
  };

  window.filter = {
    sortOut: function (pinsCopy) {
      var filteredPins = pinsCopy
      .filter(checkingHouseType)
      .filter(checkingHousePrice)
      .filter(checkingHouseRooms)
      .filter(chekingHouseGuests)
      .filter(checkingHouseWifi)
      .filter(checkingHouseDishwasher)
      .filter(checkingHouseParking)
      .filter(checkingHouseWasher)
      .filter(checkingHouseElevator)
      .filter(checkingHouseConditioner);

      window.util.debounce(function () {
        window.render.createPins(filteredPins);
        window.card.addListenersOnPin(filteredPins);
      });
    }
  };
})();
