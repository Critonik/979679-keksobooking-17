'use strict';
var map = document.querySelector('.map');
var cardBlock = document.querySelector('#card').content.querySelector('.map__card');
var onPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, window.closePopup);
};

window.closePopup = function () {
  var popupCard = document.querySelectorAll('.popup');
  for (var j = 0; j < popupCard.length; j++) {
    popupCard[j].parentNode.removeChild(popupCard[j]);
  }
  document.removeEventListener('keydown', onPopupEscPress);
};

window.card = function (info) {
  var cardModule = cardBlock.cloneNode(true);
  var cardTitle = cardModule.querySelector('.popup__title');
  var cardAdress = cardModule.querySelector('.popup__text--address');
  var cardPrice = cardModule.querySelector('.popup__text--price');
  var cardType = cardModule.querySelector('.popup__type');
  var cardGuestAndRoom = cardModule.querySelector('.popup__text--capacity');
  var cardArrivalDepartureTime = cardModule.querySelector('.popup__text--time');
  var cardFeature = cardModule.querySelector('.popup__features');
  var cardDescription = cardModule.querySelector('.popup__description');
  var cardPhotos = cardModule.querySelector('.popup__photos');
  var cardAvatars = cardModule.querySelector('.popup__avatar');
  for (var t = 0; t < info.length; t++) {
    cardTitle[t].innerText = info.offer.title;
    cardAdress[t].innerText = info.offer.address;
    cardPrice[t].innerText = info.offer.price + '₽/ночь';
    cardType[t].innerText = info.offer.type;
    cardGuestAndRoom[t].innerText = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей.';
    cardArrivalDepartureTime[t].innerText = 'Заезд после ' + info.offer.checkin + ' выезд до ' + info.offer.checkout;
    cardFeature[t].innerHTML = '';
    for (var j = 0; j < info.offer.features.length; j++) {
      cardFeature[t].innerHTML += '<li class="popup__feature popup__feature--' + info.offer.features[j] + '"></li>';
    }
    cardDescription[t].innerHTML = info.offer.description;
    cardPhotos[t].innerHTML = '';
    for (var i = 0; i < info.offer.photos.length; i++) {
      cardPhotos[t].innerHTML += '<img src="' + info.offer.photos + '" class="popup__photo" width="45" height="40" alt="Фотография жилья>';
    }
    cardAvatars[t].src = info.author.avatar;

  }
  map.insertBefore(cardModule, filtersContainer);

  var filtersContainer = map.querySelector('.map__filters-container');
  var closeButton = map.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    cardModule.parentNode.removeChild(cardModule);
  });

  closeButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.closePopup);
  });
  document.addEventListener('keydown', onPopupEscPress);

  return cardModule;
};

window.setCard = function (pin) {
  var selectPin = document.querySelectorAll('.map__pin');
  for (var i = 0; i < selectPin.length; i++) {
    if (selectPin[i].className.toLowerCase() === 'map__pin') {
      selectPin[i].addEventListener('click', function () {
        window.card(pin[i]);
      });
    }
  }
};
