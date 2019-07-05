'use strict';

window.util = (function () {
  return {
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    syncTime: function (elemFrom, value, elemTo) {
      for (var j = 0; j < elemFrom.length; j++) {
        if (value === elemTo[j].value) {
          elemTo.options[j].selected = true;
        }
      }
    },
    syncPlace: function (selectFrom, selectTo) {
      selectFrom.addEventListener('change', function (e) {
        e.preventDefault();
        window.util.syncTime(e.target, e.target.value, selectTo);
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
      for (var y = 0; y < className.children.length; y++) {
        className.children[y].removeAttribute(attribute);
      }
    },
    blockForm: function (className) {
      for (var i = 0; i < className.children.length; i++) {
        className.children[i].setAttribute('disabled', true);
      }
    }
  };
})();

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };
})();
