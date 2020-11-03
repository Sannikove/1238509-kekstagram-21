'use strict';

(function () {
  const createMessage = function (template) {
    const copy = template.cloneNode(true);
    const container = document.querySelector(`main`).appendChild(copy);
    const message = container.querySelector(`div`);
    const messageTitle = message.querySelector(`h2`);

    const onMessageEscPress = function (evt) {
      window.main.isEscEvent(evt, closeMessage);
    };

    document.addEventListener(`click`, function (evt) {
      if (message !== evt.target && messageTitle !== evt.target) {
        closeMessage();
      }
    });

    document.addEventListener(`keydown`, onMessageEscPress);

    const closeMessage = function () {
      container.classList.add(`hidden`);
      document.removeEventListener(`keydown`, onMessageEscPress);
    };
  };

  window.message = {
    createMessage
  };
})();
