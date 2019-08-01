'use strict';
(function () {
  var FILE_TYPES = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];
  var imgHeigthWidth = 70;
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
  var titleField = adForm.querySelector('#title');
  var fileChooserForAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var formPhotoContainer = adForm.querySelector('.ad-form__photo-container');
  var previewAvatar = adForm.querySelector('.ad-form-header__userpic');
  var fileChooserForPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('#adform_photo').content.querySelector('.ad-form__photo');
  var dropZoneForAvatar = adForm.querySelector('.ad-form-header__drop-zone');
  var dropZoneForPhoto = adForm.querySelector('.ad-form__drop-zone');
  var movedPiece = null;
  var OffersToValues = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var GuestsByRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var uploadAvatar = function (src) {
    previewAvatar.src = src;
  };

  var createImgContainer = function (result) {
    var imgContainer = previewPhoto.cloneNode(true);
    window.card.createImgElement(imgContainer, result, imgHeigthWidth, imgHeigthWidth);
    return imgContainer;
  };

  var createFormPhoto = function (photo) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createImgContainer(photo));
    formPhotoContainer.appendChild(fragment);
  };

  var isValidImage = function (type) {
    return FILE_TYPES.indexOf(type) !== -1;
  };

  var renderPhotos = function (file, cb) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      cb(reader.result);
    });

    reader.readAsDataURL(file);
  };

  var syncTime = function (elemFrom, value, elemTo) {
    for (var k = 0; k < elemFrom.length; k++) {
      if (value === elemTo[k].value) {
        elemTo.options[k].selected = true;
      }
    }
  };

  var syncPlace = function (selectFrom, selectTo) {
    selectFrom.addEventListener('change', function (evt) {
      evt.preventDefault();
      syncTime(evt.target, evt.target.value, selectTo);
    });
  };

  var changePrice = function (select, input, offers) {
    for (var key in offers) {
      if (select === key.toLowerCase()) {
        input.placeholder = offers[key];
        input.min = offers[key];
      }
    }
  };

  var onFieldRoomsChange = function (value) {
    optionsGuests.forEach(function (option) {
      option.disabled = GuestsByRooms[value].indexOf(option.value) === -1;
    });
  };

  var onFieldGuestsValidity = function (value) {
    if (GuestsByRooms[value].indexOf(guestNumber.value) === -1) {
      guestNumber.setCustomValidity('Укажите другое количество гостей');
      guestNumber.classList.add('error_outline');
    }
  };

  syncPlace(arrivalTime, departureTime);
  syncPlace(departureTime, arrivalTime);

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
    if (errorCard) {
      errorCard.remove();
    }
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', closePopup);
  };

  var closePopupSuccess = function () {
    var successCard = document.querySelector('.success');
    if (successCard) {
      successCard.remove();
    }
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var findPopupToClose = function () {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      popupCard.classList.add('hidden');
    }
  };

  var findPhotoToClose = function () {
    var formPhotoContainerContent = formPhotoContainer.querySelectorAll('.ad-form__photo');
    if (formPhotoContainerContent) {
      formPhotoContainerContent.forEach(function (elemToDelete) {
        elemToDelete.remove();
      });
    }
  };

  var clearAllFields = function () {
    findPopupToClose();
    previewAvatar.src = 'img/muffin-grey.svg';
    window.util.blockForm(adForm);
    window.util.blockForm(mapFilters);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.render.deletePins();
    priceInput.placeholder = OffersToValues[placeType.value.toUpperCase()];
    setDefaultPosition();
    window.map.setAdress(mainPin);
    findPhotoToClose();
    window.map.offersLoaded = false;
  };

  var createSuccessBlock = function () {
    var successBlock = document.querySelector('#success').content.querySelector('.success');
    var successModule = successBlock.cloneNode(true);
    var main = document.querySelector('.main');
    main.appendChild(successModule);
  };

  var onSuccess = function () {
    clearAllFields();
    createSuccessBlock();
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', closePopupSuccess);
  };

  var createErrorBlock = function (text) {
    var errorBlock = document.querySelector('#error').content.querySelector('.error');
    var errorText = document.querySelector('#error').content.querySelector('.error__message');
    errorText.textContent = text;
    var errorModule = errorBlock.cloneNode(true);
    var main = document.querySelector('.main');
    main.appendChild(errorModule);
  };

  var addErrorButtonListener = function () {
    var main = document.querySelector('.main');
    var errorButton = main.querySelector('.error__button');
    if (errorButton) {
      errorButton.addEventListener('click', function () {
        closePopup();
      });
    }
  };

  var onError = function (errorMessage) {
    createErrorBlock(errorMessage);
    addErrorButtonListener();
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', closePopup);
  };

  dropZoneForAvatar.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  dropZoneForAvatar.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });

  dropZoneForAvatar.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  dropZoneForAvatar.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var data = evt.dataTransfer;
    var files = data.files;
    renderPhotos(files[0], uploadAvatar);
  });

  dropZoneForPhoto.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  dropZoneForPhoto.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  dropZoneForPhoto.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });

  dropZoneForPhoto.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var data = evt.dataTransfer;
    var files = data.files;
    var photoArray = Array.from(files);
    photoArray.forEach(function (photo) {
      renderPhotos(photo, createFormPhoto);
    });
  });

  guestNumber.addEventListener('change', function (evt) {
    if (GuestsByRooms[roomNumber.value].indexOf(evt.target.value) !== -1) {
      guestNumber.setCustomValidity('');
      guestNumber.classList.remove('error_outline');
    }
  });

  roomNumber.addEventListener('change', function (evt) {
    onFieldRoomsChange(evt.target.value);
    onFieldGuestsValidity(evt.target.value);
  });

  placeType.addEventListener('change', function (evt) {
    evt.preventDefault();
    changePrice(evt.target.value, priceInput, OffersToValues);
  });

  priceInput.addEventListener('input', function (evt) {
    evt.preventDefault();
    var placeTypeValue = placeType.value;
    var minPrice = OffersToValues[placeTypeValue.toUpperCase()];
    if (evt.target.value >= minPrice) {
      priceInput.classList.remove('error_outline');
      evt.target.setCustomValidity('');
    } else {
      priceInput.classList.add('error_outline');
      evt.target.setCustomValidity('Цена должны быть не меньше ' + minPrice + ' рублей');
    }
  });

  titleField.addEventListener('input', function () {
    if (titleField.validity.tooShort) {
      titleField.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      titleField.classList.add('error_outline');
    } else {
      titleField.setCustomValidity('');
      titleField.classList.remove('error_outline');
    }
  });

  fileChooserForPhoto.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = fileChooserForPhoto.files;

    var matches = Array.from(file).filter(function (it) {
      return isValidImage(it.type);
    });

    if (matches) {
      var photoArray = Array.from(file);
      photoArray.forEach(function (photo) {
        renderPhotos(photo, createFormPhoto);
      });
    }
  });

  fileChooserForAvatar.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = evt.target.files;

    var matches = Array.from(file).filter(function (it) {
      return isValidImage(it.type);
    });

    if (matches) {
      renderPhotos(file[0], uploadAvatar);
    }
  });

  formPhotoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.parentNode.classList.contains('ad-form__photo')) {
      movedPiece = evt.target.parentNode;
      evt.dataTransfer.setData('text', '');
    } else if (evt.target.classList.contains('ad-form__photo')) {
      movedPiece = evt.target.parentNode;
      evt.dataTransfer.setData('text', '');
    }
  });

  formPhotoContainer.addEventListener('drop', function (evt) {
    if (evt.target.parentNode.classList.contains('ad-form__photo')) {
      formPhotoContainer.insertBefore(movedPiece, evt.target.parentNode);
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, onError);
  });

  resetButton.addEventListener('click', function () {
    clearAllFields();
  });
})();
