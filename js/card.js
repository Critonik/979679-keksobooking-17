'use strict';
(function () {

  var map = document.querySelector('.map');
  var cardBlock = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = map.querySelector('.map__filters-container');
  var cardModule = cardBlock.cloneNode(true);
  var cardImgHeigth = 45;
  var cardImgWidth = 40;
  var TypeToType = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    var popupCard = document.querySelector('.popup');
    popupCard.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function () {
    var popupCard = document.querySelector('.popup');
    popupCard.classList.remove('hidden');
  };

  var createLiElement = function (elem, secondClass) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + secondClass + '');
    elem.insertAdjacentElement('afterbegin', li);
  };


  var createCardElement = function (info) {
    cardModule.querySelector('.popup__title').innerText = info.offer.title;
    cardModule.querySelector('.popup__text--address').innerText = info.offer.address;
    cardModule.querySelector('.popup__text--price').innerText = info.offer.price + '₽/ночь';
    cardModule.querySelector('.popup__type').innerText = TypeToType[info.offer.type.toUpperCase()];
    cardModule.querySelector('.popup__text--capacity').innerText = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей.';
    cardModule.querySelector('.popup__text--time').innerText = 'Заезд после ' + info.offer.checkin + ' выезд до ' + info.offer.checkout;
    var cardFeature = cardModule.querySelector('.popup__features');
    cardModule.querySelector('.popup__description').innerText = info.offer.description;
    var cardPhotos = cardModule.querySelector('.popup__photos');
    cardModule.querySelector('.popup__avatar').src = info.author.avatar;
    cardFeature.innerHTML = '';
    for (var i = 0; i < info.offer.features.length; i++) {
      createLiElement(cardFeature, info.offer.features[i]);
    }
    cardPhotos.innerHTML = '';
    for (var j = 0; j < info.offer.photos.length; j++) {
      window.card.createImgElement(cardPhotos, info.offer.photos[j], cardImgHeigth, cardImgWidth);
    }
    cardModule.classList.add('hidden');
    return cardModule;
  };

  var detectionCard = function (pinsArr, elem) {
    var parsedElX = parseInt(elem.dataset.keyPinX, 10);
    var parsedElY = parseInt(elem.dataset.keyPinY, 10);
    var filteredPins;
    filteredPins = pinsArr.filter(function (it) {
      return ((it.location.x === parsedElX) && (it.location.y === parsedElY));
    });
    return filteredPins[0];
  };

  var renderCard = function (info) {
    createCardElement(info);
    map.insertBefore(cardModule, filtersContainer);
    var closeButton = map.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
      closePopup();
    });

    closeButton.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.card = {
    addListenersOnPin: function (pinsArr) {
      var selectedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      selectedPins.forEach(function (selectedPin) {
        selectedPin.addEventListener('click', function (evt) {
          renderCard(detectionCard(pinsArr, evt.currentTarget));
          openPopup();
        });
      });
    },
    delete: function () {
      var popupCard = document.querySelector('.popup');
      if (popupCard) {
        popupCard.classList.add('hidden');
      }
    },
    createImgElement: function (elem, imgSrc, imgHeight, imgWidth) {
      var img = document.createElement('img');
      img.classList.add('popup__photo');
      img.width = imgHeight;
      img.height = imgWidth;
      img.alt = 'Фотография жилья';
      img.src = imgSrc;
      elem.insertAdjacentElement('afterbegin', img);
    }
  };
})();
