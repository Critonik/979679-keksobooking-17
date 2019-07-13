'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 500;

  window.util = {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    syncTime: function (elemFrom, value, elemTo) {
      for (var i = 0; i < elemFrom.length; i++) {
        if (value === elemTo[i].value) {
          elemTo.options[i].selected = true;
        }
      }
    },
    syncPlace: function (selectFrom, selectTo) {
      selectFrom.addEventListener('change', function (evt) {
        evt.preventDefault();
        window.util.syncTime(evt.target, evt.target.value, selectTo);
      });
    },
    changePrice: function (select, input, offers) {
      for (var key in offers) {
        if (select === key) {
          input.placeholder = offers[key];
          input.min = offers[key];
        }
      }
    },
    unblockForm: function (className, attribute) {
      for (var j = 0; j < className.children.length; j++) {
        className.children[j].removeAttribute(attribute);
      }
    },
    blockForm: function (className) {
      for (var k = 0; k < className.children.length; k++) {
        className.children[k].setAttribute('disabled', true);
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    debounce: function (cb) {
      var lastTimeout;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();
