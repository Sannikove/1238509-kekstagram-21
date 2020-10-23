'use strict';

(function () {
  const getRandomArbitrary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomArrayElement = function (arr) {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  const getRandomPermutation = (n) => {
    let arr = Array.from(Array(n).keys());

    for (let i = (n - 1); i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  window.main = {
    getRandomArbitrary,
    getRandomArrayElement,
    getRandomPermutation
  };
})();
