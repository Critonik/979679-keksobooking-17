'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var placeType = adForm.querySelector('#type');
  var arrivalTime = adForm.querySelector('#timein');
  var departureTime = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');

  var offerToValue = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  placeType.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.changePrice(evt.target.value, priceInput, offerToValue);
    window.deletePins();
    window.debounce(window.updatePins);
  });

  window.util.syncPlace(arrivalTime, departureTime);
  window.util.syncPlace(departureTime, arrivalTime);
})();
