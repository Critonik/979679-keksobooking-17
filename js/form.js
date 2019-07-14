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
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var resetButton = adForm.querySelector('.ad-form__reset');

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

  priceInput.addEventListener('input', function (evt) {
    evt.preventDefault();
    var placeTypeValue = placeType.value;
    var minPrice = OfferToValue[placeTypeValue];
    if (event.target.value < minPrice) {
      event.target.setCustomValidity('Цена должны быть не меньше ' + minPrice + ' рублей');
    } else {
      event.target.setCustomValidity('');
    }
  });

  var onFieldRoomsChange = function (value) {
    optionsGuests.forEach(function (option) {
      option.disabled = GuestsByRoom[value].indexOf(option.value) === -1;
    });
  };

  var onFieldGuestsValidity = function (value) {
    if (GuestsByRoom[value].indexOf(guestNumber.value) === -1) {
      guestNumber.setCustomValidity('Укажите другое количество гостей');
    }
  };

  guestNumber.addEventListener('change', function () {
    if (GuestsByRoom[roomNumber.value].indexOf(event.target.value) !== -1) {
      guestNumber.setCustomValidity('');
    }
  });

  roomNumber.addEventListener('change', function () {
    onFieldRoomsChange(event.target.value);
    onFieldGuestsValidity(event.target.value);
  });

  window.util.syncPlace(arrivalTime, departureTime);
  window.util.syncPlace(departureTime, arrivalTime);

  var setDefaultPosition = function () {
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  };

  var onErrorEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var onSuccessEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopupSuccess);
  };

  var closePopup = function () {
    var errorCard = document.querySelector('.error');
    errorCard.classList.add('hidden');
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var closePopupSuccess = function () {
    var successCard = document.querySelector('.success');
    successCard.classList.add('hidden');
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var clearForm = function () {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      popupCard.classList.add('hidden');
    }
    window.util.blockForm(adForm);
    window.util.blockForm(mapFilters);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.render.deletePins();
    window.map.setAdress(mainPin);
    setDefaultPosition();
  };

  var onSuccess = function () {
    clearForm();
    var successBlock = document.querySelector('#success').content.querySelector('.success');
    var successModule = successBlock.cloneNode(true);
    var main = document.querySelector('.main');
    main.appendChild(successModule);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closePopupSuccess);
  };

  var onError = function (errorMessage) {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    var errorModule = errorBlock.cloneNode(true);
    var main = document.querySelector('.main');
    main.appendChild(errorModule);
    errorBlock.textContent = errorMessage;
    var errorButton = main.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      closePopup();
    });
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closePopup);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, onError);
  });

  resetButton.addEventListener('click', function () {
    clearForm();
  });
})();
