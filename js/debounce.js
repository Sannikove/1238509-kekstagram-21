'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  let lastTimeout;
  window.debounce = function (cb, button) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(button);
    }, DEBOUNCE_INTERVAL);
  };
})();

