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
    middle: 10000,
    low: null,
    high: 50000
  };

  var PricesFuncMax = {
    middle: 50000,
    low: 10000,
    high: null
  };

  window.filter = {
    filtering: function (pinsCopy) {
      var filteredPins = pinsCopy.filter(function (it) {
        return housingType.value !== 'any' ? it.offer.type === housingType.value : pinsCopy;
      })
      .filter(function (it) {
        if (housingPrice.value !== 'any') {
          if (housingPrice.value === 'high') {
            return it.offer.price >= PricesFuncMin[housingPrice.value];
          }
          return (it.offer.price >= PricesFuncMin[housingPrice.value] && it.offer.price < PricesFuncMax[housingPrice.value]);
        }
        return pinsCopy;
      })
      .filter(function (it) {
        return housingRooms.value !== 'any' ? it.offer.rooms === +housingRooms.value : pinsCopy;
      })
      .filter(function (it) {
        if (housingGuests.value !== 'any') {
          if (housingGuests.value === '0') {
            return it.offer.guests === +housingGuests.value;
          }
          return it.offer.guests >= +housingGuests.value;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        return checkWifi.checked ? it.offer.features.indexOf(checkWifi.value) >= 0 : pinsCopy;
      })
      .filter(function (it) {
        return checkDishwasher.checked ? it.offer.features.indexOf(checkDishwasher.value) >= 0 : pinsCopy;
      })
      .filter(function (it) {
        return checkParking.checked ? it.offer.features.indexOf(checkParking.value) >= 0 : pinsCopy;
      })
      .filter(function (it) {
        return checkWasher.checked ? it.offer.features.indexOf(checkWasher.value) >= 0 : pinsCopy;
      })
      .filter(function (it) {
        return checkElevator.checked ? it.offer.features.indexOf(checkElevator.value) >= 0 : pinsCopy;
      })
      .filter(function (it) {
        return checkConditioner.checked ? it.offer.features.indexOf(checkConditioner.value) >= 0 : pinsCopy;
      });

      window.util.debounce(function () {
        window.render.createPins(filteredPins);
      });
    }
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
    for (var i = 0; i < housingFeaturesArray.length; i++) {
      housingFeaturesArray[i].addEventListener('change', function (evt) {
        evt.preventDefault();
        window.render.updatePins();
      });
    }
  };
  addListenerOnCheckbox();
})();
