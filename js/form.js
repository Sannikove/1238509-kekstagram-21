'use strict';

(function () {
  const formUpload = document.querySelector(`.img-upload__form`);
  const pinSlider = document.querySelector(`.effect-level__pin`);
  const sliderInput = document.querySelector(`.effect-level__value`);
  const sliderLenght = 100;
  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleControlMaxValue = 100;
  const scaleControlMinValue = 25;
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);
  const MIN_PIN_VALUE = 0;
  const MAX_PIN_VALUE = 453;
  const successTemplate = document.querySelector(`#success`).content.querySelector(`section`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`section`);

  window.dialog.levelBar.classList.add(`hidden`);

  const getLevelEffect = function () {
    if (window.dialog.preview.classList.contains(`effects__preview--chrome`)) {
      window.dialog.preview.style.filter = `grayscale(` + sliderInput.value / sliderLenght + `)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--sepia`)) {
      window.dialog.preview.style.filter = `sepia(` + sliderInput.value / sliderLenght + `)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--marvin`)) {
      window.dialog.preview.style.filter = `invert(` + sliderInput.value + `%)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--phobos`)) {
      window.dialog.preview.style.filter = `blur(` + 3 * sliderInput.value / sliderLenght + `px)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--heat`)) {
      window.dialog.preview.style.filter = `brightness(` + (2 * sliderInput.value / sliderLenght + 1) + `)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--none`)) {
      window.dialog.preview.style = ``;
      window.dialog.levelBar.classList.add(`hidden`);
    }
  };

  const filterChangeHandler = function (evt) {
    if (evt.target && evt.target.matches(`input[type="radio"]`)) {
      window.dialog.levelBar.classList.remove(`hidden`);
      sliderInput.setAttribute(`value`, sliderLenght);
      pinSlider.style.left = MAX_PIN_VALUE + `px`;
      effectLevelDepth.style.width = MAX_PIN_VALUE + `px`;
      window.dialog.preview.className = ``;
      let filterClass = `effects__preview--` + evt.target.value;
      window.dialog.preview.classList.add(filterClass);
      getLevelEffect();
    }
  };

  formUpload.addEventListener(`change`, filterChangeHandler);

  formUpload.addEventListener(`submit`, function (evt) {
    window.backend.send(new FormData(formUpload), function () {
      window.dialog.closePopup();
      window.message.createMessage(successTemplate);
    }, function () {
      window.dialog.closePopup();
      window.message.createMessage(errorTemplate);
    });
    evt.preventDefault();
  });

  window.dialog.scaleControlValue.value = window.dialog.scaleControlDefault;

  scaleControlSmaller.addEventListener(`click`, function () {
    if (parseInt(window.dialog.scaleControlValue.value, 10) > scaleControlMinValue) {
      window.dialog.scaleControlValue.value = parseInt(window.dialog.scaleControlValue.value, 10) - scaleControlMinValue + `%`;
    } else {
      window.dialog.scaleControlValue.value = scaleControlMinValue + `%`;
    }
    window.dialog.preview.style.transform = `scale(` + parseInt(window.dialog.scaleControlValue.value, 10) / 100 + `)`;
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (parseInt(window.dialog.scaleControlValue.value, 10) === scaleControlMaxValue) {
      window.dialog.scaleControlValue.value = scaleControlMaxValue + `%`;
    } else {
      window.dialog.scaleControlValue.value = parseInt(window.dialog.scaleControlValue.value, 10) + scaleControlMinValue + `%`;
    }
    window.dialog.preview.style.transform = `scale(` + parseInt(window.dialog.scaleControlValue.value, 10) / 100 + `)`;
  });

  window.dialog.hashtagInput.addEventListener(`change`, function () {
    let hashtagArr = window.dialog.hashtagInput.value.split(` `);
    let re = /^#[\wа-яА-ЯЁё]+$/;
    let uniqHashtags = [];
    let lowerHashtag;

    for (let i = 0; i < hashtagArr.length; i++) {
      if (!re.test(hashtagArr[i])) {
        window.dialog.hashtagInput.setCustomValidity(`Не валидное значение: ` + hashtagArr[i] + `. Хештег должен начинаться с # и состоять из букв и чисел, и не может содержать спецсимволы.`);
        break;
      } else if (hashtagArr[i].length > 20) {
        window.dialog.hashtagInput.setCustomValidity(`Не валидное значение: ` + hashtagArr[i] + `. Хештег не может быть длиннее 20 символов.`);
        break;
      } else {
        window.dialog.hashtagInput.setCustomValidity(``);
      }

      lowerHashtag = hashtagArr[i].toLowerCase();
      if (uniqHashtags.includes(lowerHashtag)) {
        window.dialog.hashtagInput.setCustomValidity(`Хештег ` + lowerHashtag + ` введен дважды. Один и тот же хэш-тег не может повторяться.`);
        break;
      }
      uniqHashtags.push(lowerHashtag);
    }

    if (hashtagArr.length > 5) {
      window.dialog.hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
    }
  });

  window.form = {
    sliderLenght,
    sliderInput,
    pinSlider,
    effectLevelDepth,
    MIN_PIN_VALUE,
    MAX_PIN_VALUE,
    getLevelEffect
  };

})();
