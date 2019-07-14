'use strict';
(function () {
  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pins = [];
  var map = document.querySelector('.map');
  var mapPinsElement = map.querySelector('.map__pins');
  var housingType = map.querySelector('#housing-type');

  var createPinsWithInfo = function (info) {
    var pinElement = pinsTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');
    pinElementImg.src = info.author.avatar;
    pinElementImg.alt = info.offer.type;
    pinElement.style.left = info.location.x + 'px';
    pinElement.style.top = info.location.y + 'px';
    pinElement.setAttribute('data-key-pin-X', info.location.x);
    pinElement.setAttribute('data-key-pin-Y', info.location.y);
    return pinElement;
  };

  var createPins = function (elem) {
    var takeNumber = elem.length > 5 ? 5 : elem.length;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(createPinsWithInfo(elem[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  window.render = {
    deletePins: function () {
      var deletedPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var j = 0; j < deletedPins.length; j++) {
        deletedPins[j].parentNode.removeChild(deletedPins[j]);
      }
    },
    updatePins: function (type) {
      var popupCard = document.querySelector('.popup');
      if (popupCard) {
        popupCard.classList.add('hidden');
      }
      var pinsCopy = pins.slice();
      createPins(pinsCopy);
      var filteredPins;
      if (type !== 'any') {
        filteredPins = pinsCopy.filter(function (it) {
          return it.offer.type === type;
        });
        window.render.deletePins();
        createPins(filteredPins);
      }
      window.card.addListenersOnPin(pinsCopy);
    },
    onError: function (errorMessage) {
      var errorBlock = document.querySelector('#error').content.querySelector('.error');
      var errorModule = errorBlock.cloneNode(true);
      map.appendChild(errorModule);
      errorBlock.textContent = errorMessage;
      var errorButton = map.querySelector('.error__button');
      errorButton.addEventListener('click', function () {
        location.reload();
      });
    },
    createPinOnMap: function () {
      var successHandler = function (data) {
        var typeOfHouse = document.getElementById('housing-type').value;
        pins = data;
        window.util.debounce(function () {
          window.render.updatePins(typeOfHouse);
        });
      };
      window.backend.load(successHandler, window.render.onError);
    }
  };

  housingType.addEventListener('change', function (evt) {
    evt.preventDefault();
    var typeOfHouse = document.getElementById('housing-type').value;
    window.util.debounce(function () {
      window.render.updatePins(typeOfHouse);
    });
  });
})();
