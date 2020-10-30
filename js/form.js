'use strict';

(function () {
  const levelBar = document.querySelector(`.img-upload__effect-level`);
  const preview = document.querySelector(`.img-upload__preview`).querySelector(`img`);
  const formUpload = document.querySelector(`.img-upload__form`);
  const pinSlider = document.querySelector(`.effect-level__pin`);
  const sliderInput = document.querySelector(`.effect-level__value`);
  const sliderLenght = 100;
  const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const scaleControlDefault = 100 + `%`;
  const scaleControlMaxValue = 100;
  const scaleControlMinValue = 25;
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);
  const MIN_PIN_VALUE = 0;
  const MAX_PIN_VALUE = 453;

  levelBar.classList.add(`hidden`);

  const getLevelEffect = function () {
    if (preview.classList.contains(`effects__preview--chrome`)) {
      preview.style.filter = `grayscale(` + sliderInput.value / sliderLenght + `)`;
    }
    if (preview.classList.contains(`effects__preview--sepia`)) {
      preview.style.filter = `sepia(` + sliderInput.value / sliderLenght + `)`;
    }
    if (preview.classList.contains(`effects__preview--marvin`)) {
      preview.style.filter = `invert(` + sliderInput.value + `%)`;
    }
    if (preview.classList.contains(`effects__preview--phobos`)) {
      preview.style.filter = `blur(` + 3 * sliderInput.value / sliderLenght + `px)`;
    }
    if (preview.classList.contains(`effects__preview--heat`)) {
      preview.style.filter = `brightness(` + (2 * sliderInput.value / sliderLenght + 1) + `)`;
    }
    if (preview.classList.contains(`effects__preview--none`)) {
      preview.style = ``;
      levelBar.classList.add(`hidden`);
    }
  };

  const filterChangeHandler = function (evt) {
    if (evt.target && evt.target.matches(`input[type="radio"]`)) {
      levelBar.classList.remove(`hidden`);
      sliderInput.setAttribute(`value`, sliderLenght);
      pinSlider.style.left = MAX_PIN_VALUE + `px`;
      effectLevelDepth.style.width = MAX_PIN_VALUE + `px`;
      preview.className = ``;
      let filterClass = `effects__preview--` + evt.target.value;
      preview.classList.add(filterClass);
      getLevelEffect();
    }
  };

  formUpload.addEventListener(`change`, filterChangeHandler);
  scaleControlValue.value = scaleControlDefault;

  scaleControlSmaller.addEventListener(`click`, function () {
    if (parseInt(scaleControlValue.value, 10) > scaleControlMinValue) {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) - scaleControlMinValue + `%`;
    } else {
      scaleControlValue.value = scaleControlMinValue + `%`;
    }
    preview.style.transform = `scale(` + parseInt(scaleControlValue.value, 10) / 100 + `)`;
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (parseInt(scaleControlValue.value, 10) === scaleControlMaxValue) {
      scaleControlValue.value = scaleControlMaxValue + `%`;
    } else {
      scaleControlValue.value = parseInt(scaleControlValue.value, 10) + scaleControlMinValue + `%`;
    }
    preview.style.transform = `scale(` + parseInt(scaleControlValue.value, 10) / 100 + `)`;
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
