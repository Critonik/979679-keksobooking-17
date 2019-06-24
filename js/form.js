'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var placeType = adForm.querySelector('#type');
  var arrivalTime = adForm.querySelector('#timein');
  var departureTime = adForm.querySelector('#timeout');
  var priceInput = adForm.querySelector('#price');
  var setOffer = ['bungalo', 'flat', 'house', 'palace'];

  placeType.addEventListener('change', function (evt) {
    evt.preventDefault();
    var target = evt.target.value;
    window.util.changePrice(target, priceInput, setOffer);
  });

  window.util.syncPlace(arrivalTime, departureTime);
  window.util.syncPlace(departureTime, arrivalTime);
})();
