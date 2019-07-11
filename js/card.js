'use strict';
(function () {

  var map = document.querySelector('.map');
  var cardBlock = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = map.querySelector('.map__filters-container');
  var cardModule = cardBlock.cloneNode(true);
  var TypeToType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, window.closePopup);
  };

  window.closePopup = function () {
    var popupCard = document.querySelector('.popup');
    popupCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  window.openPopup = function () {
    var popupCard = document.querySelector('.popup');
    popupCard.classList.remove('hidden');
  };

  var createLiElement = function (el, secondClass) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + secondClass + '');
    el.insertAdjacentElement('afterbegin', li);
  };

  var createImgElement = function (el, imgSrc) {
    var img = document.createElement('img');
    img.classList.add('popup__photo');
    img.width = '45';
    img.height = '40';
    img.alt = 'Фотография жилья';
    img.src = imgSrc;
    el.insertAdjacentElement('afterbegin', img);
  };

  var renderCard = function (info) {
    cardModule.querySelector('.popup__title').innerText = info.offer.title;
    cardModule.querySelector('.popup__text--address').innerText = info.offer.address;
    cardModule.querySelector('.popup__text--price').innerText = info.offer.price + '₽/ночь';
    cardModule.querySelector('.popup__type').innerText = TypeToType[info.offer.type];
    cardModule.querySelector('.popup__text--capacity').innerText = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей.';
    cardModule.querySelector('.popup__text--time').innerText = 'Заезд после ' + info.offer.checkin + ' выезд до ' + info.offer.checkout;
    var cardFeature = cardModule.querySelector('.popup__features');
    cardModule.querySelector('.popup__description').innerText = info.offer.description;
    var cardPhotos = cardModule.querySelector('.popup__photos');
    cardModule.querySelector('.popup__avatar').src = info.author.avatar;
    cardFeature.innerHTML = '';
    for (var j = 0; j < info.offer.features.length; j++) {
      createLiElement(cardFeature, info.offer.features[j]);
    }
    cardPhotos.innerHTML = '';
    for (var i = 0; i < info.offer.photos.length; i++) {
      createImgElement(cardPhotos, info.offer.photos[i]);
    }
    cardModule.classList.add('hidden');
    return cardModule;
  };

  var detectedCard = function (pinsArr, elem) {
    var parsedElX = parseInt(elem.dataset.keyPinX, 10);
    var parsedElY = parseInt(elem.dataset.keyPinY, 10);
    for (var j = 0; j < pinsArr.length; j++) {
      if (parsedElX === pinsArr[j].location.x && parsedElY === pinsArr[j].location.y) {
        return pinsArr[j];
      }
    }
    return pinsArr;
  };

  window.card = function (info) {
    renderCard(info);
    map.insertBefore(cardModule, filtersContainer);
    var closeButton = map.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      window.closePopup();
    });

    closeButton.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, window.closePopup);
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.addListenersOnPin = function (pinsArr) {
    var selectPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < selectPins.length; i++) {
      selectPins[i].addEventListener('click', function (evt) {
        window.card(detectedCard(pinsArr, evt.currentTarget));
        window.openPopup();
      });
    }
  };
})();
