'use strict';

window.util = (function () {
  return {
    randomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    syncTime: function (firstOption, firstOptionValue, time) {
      for (var j = 0; j < firstOption.length; j++) {
        if (firstOptionValue === time[j].value) {
          time.options[j].selected = true;
        }
      }
    },
    syncPlace: function (elem, inTime) {
      elem.addEventListener('change', function (e) {
        e.preventDefault();
        var first = e.target;
        var firstValue = e.target.value;
        window.util.syncTime(first, firstValue, inTime);
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
    deleteBlockChildren: function (className, attribute) {
      for (var y = 0; y < className.children.length; y++) {
        className.children[y].removeAttribute(attribute);
      }
    },
    deleteBlockTag: function (tagName, attr) {
      tagName.classList.remove(attr);
    },
    addBlockChildren: function (className) {
      for (var i = 0; i < className.children.length; i++) {
        className.children[i].setAttribute('disabled', true);
      }
    }
  };
})();
