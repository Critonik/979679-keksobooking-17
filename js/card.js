'use strict';
var map = document.querySelector('.map');
var cardBlock = document.querySelector('#card').content.querySelector('.map__card');
var filtersContainer = map.querySelector('.map__filters-container');
var pin = [];
var cardModule = cardBlock.cloneNode(true);
var typeToType = {
  bungalo: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец'
};

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

var renderCard = function (info) {
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
  cardTitle.innerText = info.offer.title;
  cardAdress.innerText = info.offer.address;
  cardPrice.innerText = info.offer.price + '₽/ночь';
  cardType.innerText = info.offer.type;
  for (var key in typeToType) {
    if (info.offer.type === key) {
      cardType.innerText = typeToType[key];
    }
  }
  cardGuestAndRoom.innerText = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей.';
  cardArrivalDepartureTime.innerText = 'Заезд после ' + info.offer.checkin + ' выезд до ' + info.offer.checkout;
  cardFeature.innerHTML = '';
  for (var j = 0; j < info.offer.features.length; j++) {
    cardFeature.innerHTML += '<li class="popup__feature popup__feature--' + info.offer.features[j] + '"></li>';
  }
  cardDescription.innerHTML = info.offer.description;
  cardPhotos.innerHTML = '';
  for (var i = 0; i < info.offer.photos.length; i++) {
    cardPhotos.innerHTML += '<img src="' + info.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья>';
  }
  cardAvatars.src = info.author.avatar;

  map.insertBefore(cardModule, filtersContainer);
  return cardModule;
};

window.card = function (info) {
  renderCard(info);

  var closeButton = map.querySelector('.popup__close');
  closeButton.addEventListener('click', function () {
    cardModule.parentNode.removeChild(cardModule);
  });

  closeButton.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.closePopup);
  });
  document.addEventListener('keydown', onPopupEscPress);
};

window.setCard = function () {
  var selectPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var i = 0; i < selectPin.length; i++) {
    if (selectPin[i].className.toLowerCase() === 'map__pin') {
      selectPin[i].addEventListener('click', function () {
        window.card(pin[i]);
      });
    }
  }
};
