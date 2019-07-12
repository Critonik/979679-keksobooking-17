'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var placeType = adForm.querySelector('#type');
  var arrivalTime = adForm.querySelector('#timein');
  var departureTime = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var roomNumber = adForm.querySelector('#room_number');
  var guestNumber = adForm.querySelector('#capacity');
  var optionsGuests = guestNumber.querySelectorAll('option');

  var OfferToValue = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var GuestsByRoom = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  placeType.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.changePrice(evt.target.value, priceInput, OfferToValue);
  });

  var onFieldRoomsChange = function (value) {
    var availableOptions = GuestsByRoom[value];
    optionsGuests.forEach(function (option) {
      option.disabled = availableOptions.indexOf(option.value) === -1;
    });
  };

  var onFieldGuestsValidity = function (value) {
    var availableOptions = GuestsByRoom[value];
    if (availableOptions.indexOf(guestNumber.value) === -1) {
      guestNumber.setCustomValidity('Укажите другое количество гостей');
    }
    guestNumber.addEventListener('change', function () {
      if (availableOptions.indexOf(guestNumber.value) !== -1) {
        guestNumber.setCustomValidity('');
      }
    });
  };

  roomNumber.addEventListener('change', function () {
    onFieldRoomsChange(roomNumber.value);
    onFieldGuestsValidity(roomNumber.value);
  });

  window.util.syncPlace(arrivalTime, departureTime);
  window.util.syncPlace(departureTime, arrivalTime);
})();
