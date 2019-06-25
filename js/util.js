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
    changePrice: function (select, input, offer) {
      switch (select) {
        case offer[0]:
          input.placeholder = '0';
          input.min = '0';
          break;
        case offer[1]:
          input.placeholder = '1000';
          input.min = '1000';
          break;
        case offer[2]:
          input.placeholder = '5000';
          input.min = '5000';
          break;
        case offer[3]:
          input.placeholder = '10000';
          input.min = '10000';
          break;
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
