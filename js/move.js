'use strict';

(function () {
  window.form.pinSlider.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      let newCoords = window.form.pinSlider.offsetLeft - shift.x;
      if (newCoords <= window.form.MIN_PIN_VALUE) {
        newCoords = window.form.MIN_PIN_VALUE;
      } else if (newCoords >= window.form.MAX_PIN_VALUE) {
        newCoords = window.form.MAX_PIN_VALUE;
      }

      window.form.pinSlider.style.left = newCoords + `px`;
      window.form.effectLevelDepth.style.width = newCoords + `px`;
      let effectValue = Math.floor(newCoords / window.form.MAX_PIN_VALUE * window.form.sliderLenght);
      window.form.sliderInput.setAttribute(`value`, effectValue);
      window.form.getLevelEffect();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
