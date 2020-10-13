'use strict';

(function () {
  const getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomArrayElement = function (arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  window.main = {
    getRandomArbitrary,
    getRandomArrayElement
  };
})();
