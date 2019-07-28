'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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
  var fileChooserForAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var formPhotoContainer = adForm.querySelector('.ad-form__photo-container');
  var previewAvatar = adForm.querySelector('.ad-form-header__userpic');
  var fileChooserForPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('#adform_photo').content.querySelector('.ad-form__photo');
  var dropZoneForAvatar = adForm.querySelector('.ad-form-header__drop-zone');
  var dropZoneForPhoto = adForm.querySelector('.ad-form__drop-zone');
  var movedPiece = null;
  var OffersToValues = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var GuestsByRooms = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  dropZoneForAvatar.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  dropZoneForAvatar.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  dropZoneForAvatar.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
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

  var createImgContainer = function (result) {
    var imgContainer = previewPhoto.cloneNode(true);
    window.card.createImgElement(imgContainer, result, imgHeigthWidth, imgHeigthWidth);
    return imgContainer;
  };

  var previewFile = function (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', function () {
      previewAvatar.src = reader.result;
    });
    reader.readAsDataURL(file);
  };

  var createFormPhoto = function (r) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createImgContainer(r));

    formPhotoContainer.appendChild(fragment);
  };

  dropZoneForAvatar.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var data = evt.dataTransfer;
    var files = data.files;
    previewFile(files[0]);
  });

  dropZoneForPhoto.addEventListener('drop', function (evt) {
    evt.preventDefault();
    var data = evt.dataTransfer;
    var files = data.files;
    for (var l = 0; l < files.length; l++) {
      renderPhotos(files[l]);
    }
  });


  fileChooserForAvatar.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = fileChooserForAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var renderPhotos = function (file) {
    var reader = new FileReader();
    reader.addEventListener('load', function () {
      createFormPhoto(reader.result);
    });

    reader.readAsDataURL(file);
  };

  fileChooserForPhoto.addEventListener('change', function (evt) {
    evt.preventDefault();
    var file = fileChooserForPhoto.files;
    for (var l = 0; l < file.length; l++) {
      renderPhotos(file[l]);
    }
  });


  formPhotoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.parentNode.classList.contains('ad-form__photo')) {
      movedPiece = evt.target.parentNode;
      evt.dataTransfer.setData('text', '');
    } else if (evt.target.classList.contains('ad-form__photo')) {
      movedPiece = evt.target;
      evt.dataTransfer.setData('text', '');
    }
  });

  formPhotoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  formPhotoContainer.addEventListener('drop', function (evt) {
    if (evt.target.parentNode.classList.contains('ad-form__photo')) {
      formPhotoContainer.insertBefore(movedPiece, evt.target.parentNode);
    } else {
      formPhotoContainer.insertBefore(movedPiece, null);
    }
  });

  placeType.addEventListener('change', function (evt) {
    evt.preventDefault();
    window.util.changePrice(evt.target.value, priceInput, OffersToValues);
  });

  priceInput.addEventListener('input', function (evt) {
    evt.preventDefault();
    var placeTypeValue = placeType.value;
    var minPrice = OffersToValues[placeTypeValue];
    if (evt.target.value < minPrice) {
      evt.target.setCustomValidity('Цена должны быть не меньше ' + minPrice + ' рублей');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  var onFieldRoomsChange = function (value) {
    optionsGuests.forEach(function (option) {
      option.disabled = GuestsByRooms[value].indexOf(option.value) === -1;
    });
  };

  var onFieldGuestsValidity = function (value) {
    if (GuestsByRooms[value].indexOf(guestNumber.value) === -1) {
      guestNumber.setCustomValidity('Укажите другое количество гостей');
    }
  };

  guestNumber.addEventListener('change', function (evt) {
    if (GuestsByRooms[roomNumber.value].indexOf(evt.target.value) !== -1) {
      guestNumber.setCustomValidity('');
    }
  });

  roomNumber.addEventListener('change', function (evt) {
    onFieldRoomsChange(evt.target.value);
    onFieldGuestsValidity(evt.target.value);
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
    errorCard.remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var closePopupSuccess = function () {
    var successCard = document.querySelector('.success');
    successCard.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var clearForm = function () {
    var popupCard = document.querySelector('.popup');
    if (popupCard) {
      popupCard.classList.add('hidden');
    }
    previewAvatar.src = 'img/muffin-grey.svg';
    window.util.blockForm(adForm);
    window.util.blockForm(mapFilters);
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.render.deletePins();
    window.map.setAdress(mainPin);
    setDefaultPosition();
    var formPhotoContainerContent = formPhotoContainer.querySelectorAll('.ad-form__photo');
    if (formPhotoContainerContent) {
      for (var n = 0; n < formPhotoContainerContent.length; n++) {
        formPhotoContainerContent[n].remove();
      }
    }
    window.map.offersLoaded = false;
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
