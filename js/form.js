'use strict';

(function () {
  const SLIDER_LENGTH = 100;
  const BLUR_VALUE = 3;
  const BRIGHTNESS_VALUE = 2;
  const BRIGHTNESS_MIN_VALUE = 1;
  const SCALE_CONTROL_MAX_VALUE = 100;
  const SCALE_CONTROL_MIN_VALUE = 25;
  const MIN_PIN_VALUE = 0;
  const MAX_PIN_VALUE = 453;
  const RADIX = 10;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAGS_QUANTITY = 5;
  const formUpload = document.querySelector(`.img-upload__form`);
  const pinSlider = document.querySelector(`.effect-level__pin`);
  const sliderInput = document.querySelector(`.effect-level__value`);
  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);
  const successTemplate = document.querySelector(`#success`).content.querySelector(`section`);
  const errorTemplate = document.querySelector(`#error`).content.querySelector(`section`);
  // const uploadControl = document.querySelector(`.img-upload__label`);

  window.dialog.levelBar.classList.add(`hidden`);

  const getLevelEffect = function () {
    if (window.dialog.preview.classList.contains(`effects__preview--chrome`)) {
      window.dialog.preview.style.filter = `grayscale(` + sliderInput.value / SLIDER_LENGTH + `)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--sepia`)) {
      window.dialog.preview.style.filter = `sepia(` + sliderInput.value / SLIDER_LENGTH + `)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--marvin`)) {
      window.dialog.preview.style.filter = `invert(` + sliderInput.value + `%)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--phobos`)) {
      window.dialog.preview.style.filter = `blur(` + BLUR_VALUE * sliderInput.value / SLIDER_LENGTH + `px)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--heat`)) {
      window.dialog.preview.style.filter = `brightness(` + (BRIGHTNESS_VALUE * sliderInput.value / SLIDER_LENGTH + BRIGHTNESS_MIN_VALUE) + `)`;
    }
    if (window.dialog.preview.classList.contains(`effects__preview--none`)) {
      window.dialog.preview.style = ``;
      window.dialog.levelBar.classList.add(`hidden`);
    }
  };

  const onFilterChange = function (evt) {
    if (evt.target && evt.target.matches(`input[type="radio"]`)) {
      window.dialog.levelBar.classList.remove(`hidden`);
      sliderInput.setAttribute(`value`, SLIDER_LENGTH);
      pinSlider.style.left = MAX_PIN_VALUE + `px`;
      effectLevelDepth.style.width = MAX_PIN_VALUE + `px`;
      window.dialog.preview.className = ``;
      let filterClass = `effects__preview--` + evt.target.value;
      window.dialog.preview.classList.add(filterClass);
      getLevelEffect();
    }
  };

  formUpload.addEventListener(`change`, onFilterChange);

  formUpload.addEventListener(`submit`, function (evt) {
    window.backend.onContentSend(new FormData(formUpload), function () {
      window.dialog.closePopup();
      window.message.createMessage(successTemplate);
      // uploadControl.classList.add(`hidden`);
    }, function () {
      window.dialog.closePopup();
      window.message.createMessage(errorTemplate);
    });
    evt.preventDefault();
  });

  window.dialog.scaleControlValue.value = window.dialog.scaleControlDefault;

  scaleControlSmaller.addEventListener(`click`, function () {
    if (parseInt(window.dialog.scaleControlValue.value, RADIX) > SCALE_CONTROL_MIN_VALUE) {
      window.dialog.scaleControlValue.value = parseInt(window.dialog.scaleControlValue.value, RADIX) - SCALE_CONTROL_MIN_VALUE + `%`;
    } else {
      window.dialog.scaleControlValue.value = SCALE_CONTROL_MIN_VALUE + `%`;
    }
    window.dialog.preview.style.transform = `scale(` + parseInt(window.dialog.scaleControlValue.value, RADIX) / SCALE_CONTROL_MAX_VALUE + `)`;
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (parseInt(window.dialog.scaleControlValue.value, RADIX) === SCALE_CONTROL_MAX_VALUE) {
      window.dialog.scaleControlValue.value = SCALE_CONTROL_MAX_VALUE + `%`;
    } else {
      window.dialog.scaleControlValue.value = parseInt(window.dialog.scaleControlValue.value, RADIX) + SCALE_CONTROL_MIN_VALUE + `%`;
    }
    window.dialog.preview.style.transform = `scale(` + parseInt(window.dialog.scaleControlValue.value, RADIX) / SCALE_CONTROL_MAX_VALUE + `)`;
  });

  window.dialog.hashtagInput.addEventListener(`change`, function () {
    let hashtagArr = window.dialog.hashtagInput.value.split(` `);
    let re = /^#[\wа-яА-ЯЁё]+$/;
    let uniqHashtags = [];
    let lowerHashtag;

    for (let i = 0; i < hashtagArr.length; i++) {
      if (!re.test(hashtagArr[i])) {
        window.dialog.hashtagInput.setCustomValidity(`Не валидное значение: ` + hashtagArr[i] + `. Хештег должен начинаться с # и состоять из букв и чисел, и не может содержать спецсимволы.`);
        window.dialog.hashtagInput.style.border = `6px solid red`;
        break;
      } else if (hashtagArr[i].length > MAX_HASHTAG_LENGTH) {
        window.dialog.hashtagInput.setCustomValidity(`Не валидное значение: ` + hashtagArr[i] + `. Хештег не может быть длиннее 20 символов.`);
        window.dialog.hashtagInput.style.border = `6px solid red`;
        break;
      } else {
        window.dialog.hashtagInput.setCustomValidity(``);
        window.dialog.hashtagInput.style = ``;
      }

      lowerHashtag = hashtagArr[i].toLowerCase();
      if (uniqHashtags.includes(lowerHashtag)) {
        window.dialog.hashtagInput.setCustomValidity(`Хештег ` + lowerHashtag + ` введен дважды. Один и тот же хэш-тег не может повторяться.`);
        window.dialog.hashtagInput.style.border = `6px solid red`;
        break;
      }
      uniqHashtags.push(lowerHashtag);
    }

    if (hashtagArr.length > MAX_HASHTAGS_QUANTITY) {
      window.dialog.hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
      window.dialog.hashtagInput.style.border = `6px solid red`;
    }
  });

  window.form = {
    SLIDER_LENGTH,
    sliderInput,
    pinSlider,
    effectLevelDepth,
    MIN_PIN_VALUE,
    MAX_PIN_VALUE,
    getLevelEffect
  };

})();
