'use strict';

(function () {
  var map = document.querySelector('.map');
  var housingType = map.querySelector('#housing-type');
  var housingPrice = map.querySelector('#housing-price');
  var housingRooms = map.querySelector('#housing-rooms');
  var housingGuests = map.querySelector('#housing-guests');
  var housingFeatures = map.querySelector('#housing-features');

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

  window.filter = {
    filtering: function (pinsCopy) {
      var filteredPins = pinsCopy.filter(function (it) {
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
      .filter(function (it) {
        var checkWifi = housingFeatures.querySelector('input[value="wifi"]');
        var checkWifiValue = checkWifi.value;
        if (checkWifi.checked) {
          return it.offer.features.indexOf(checkWifiValue) >= 0;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var checkDishwasher = housingFeatures.querySelector('input[value="dishwasher"]');
        var checkDishwasherValue = checkDishwasher.value;
        if (checkDishwasher.checked) {
          return it.offer.features.indexOf(checkDishwasherValue) >= 0;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var checkParking = housingFeatures.querySelector('input[value="parking"]');
        var checkParkingValue = checkParking.value;
        if (checkParking.checked) {
          return it.offer.features.indexOf(checkParkingValue) >= 0;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var checkWasher = housingFeatures.querySelector('input[value="washer"]');
        var checkWasherValue = checkWasher.value;
        if (checkWasher.checked) {
          return it.offer.features.indexOf(checkWasherValue) >= 0;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var checkElevator = housingFeatures.querySelector('input[value="elevator"]');
        var checkElevatorValue = checkElevator.value;
        if (checkElevator.checked) {
          return it.offer.features.indexOf(checkElevatorValue) >= 0;
        }
        return pinsCopy;
      })
      .filter(function (it) {
        var checkConditioner = housingFeatures.querySelector('input[value="conditioner"]');
        var checkConditionerValue = checkConditioner.value;
        if (checkConditioner.checked) {
          return it.offer.features.indexOf(checkConditionerValue) >= 0;
        }
        return pinsCopy;
      });
      window.render.createPins(filteredPins);
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

  var addListenerOnCheckbox = function () {
    var housingFeaturesArray = housingFeatures.querySelectorAll('input[name="features"]');
    for (var i = 0; i < housingFeaturesArray.length; i++) {
      housingFeaturesArray[i].addEventListener('change', function (evt) {
        evt.preventDefault();
        window.util.debounce(function () {
          window.render.updatePins();
        });
      });
    }
  };
  addListenerOnCheckbox();
})();
