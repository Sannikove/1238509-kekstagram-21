'use strict';

(function () {
  const preview = document.querySelector(`.img-upload__preview`).querySelector(`img`);
  const levelBar = document.querySelector(`.img-upload__effect-level`);
  const openUpload = document.querySelector(`#upload-file`);
  const closeUpload = document.querySelector(`#upload-cancel`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const hashtagInput = document.querySelector(`.text__hashtags`);
  const commentInput = document.querySelector(`.text__description`);
  const scaleControlValue = document.querySelector(`.scale__control--value`);
  const scaleControlDefault = 100 + `%`;

  const cleanForm = function () {
    preview.removeAttribute(`class`);
    preview.removeAttribute(`style`);
    levelBar.classList.add(`hidden`);
    preview.classList.add(`effects__preview--none`);
    document.querySelector(`#effect-none`).checked = true;
    hashtagInput.value = ``;
    commentInput.value = ``;
    scaleControlValue.value = scaleControlDefault;
  };

  const onPopupEscPress = function (evt) {
    if (document.activeElement !== commentInput && document.activeElement !== hashtagInput) {
      window.main.isEscEvent(evt, closePopup);
    }
  };

  const openPopup = function () {
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = function () {
    imgUploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
    openUpload.value = ``;
    cleanForm();

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  openUpload.addEventListener(`change`, function () {
    openPopup();
  });

  closeUpload.addEventListener(`click`, function () {
    closePopup();
  });

  window.dialog = {
    hashtagInput,
    body,
    closePopup,
    preview,
    levelBar,
    scaleControlDefault,
    scaleControlValue
  };
})();
