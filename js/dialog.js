'use strict';

(function () {
  const openUpload = document.querySelector(`#upload-file`);
  const closeUpload = document.querySelector(`#upload-cancel`);
  const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  const body = document.querySelector(`body`);
  const hashtagInput = document.querySelector(`.text__hashtags`);
  const commentInput = document.querySelector(`.text__description`);

  window.dialog = {
    hashtagInput,
    body
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

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  openUpload.addEventListener(`change`, function () {
    openPopup();
  });

  closeUpload.addEventListener(`click`, function () {
    closePopup();
  });
})();
