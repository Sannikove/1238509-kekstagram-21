'use strict';

(function () {
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const bigPicture = bigPictureContainer.querySelector(`.big-picture__img`);
  const commentList = document.querySelector(`.social__comments`);
  const pictureCross = bigPictureContainer.querySelector(`#picture-cancel`);

  const onPictureEscPress = function (evt) {
    window.main.isEscEvent(evt, closeBigPicture);
  };

  const closeBigPicture = function () {
    bigPictureContainer.classList.add(`hidden`);
    window.dialog.body.classList.remove(`modal-open`);

    document.removeEventListener(`keydown`, onPictureEscPress);
  };

  const openBigPicture = function () {
    bigPictureContainer.classList.remove(`hidden`);
    window.dialog.body.classList.add(`modal-open`);

    document.addEventListener(`keydown`, onPictureEscPress);
  };

  pictureCross.addEventListener(`click`, function () {
    closeBigPicture();
  });

  window.preview = function (photo) {
    bigPicture.querySelector(`img`).src = photo.url;
    bigPictureContainer.querySelector(`.likes-count`).textContent = photo.likes;
    bigPictureContainer.querySelector(`.comments-count`).textContent = photo.comments.length;
    bigPictureContainer.querySelector(`.social__caption`).textContent = photo.description;
    commentList.innerHTML = ``;
    createCommentsList(photo.comments);

    openBigPicture();
  };

  const createCommentsList = function (comments) {
    for (let i = 0; i < comments.length; i++) {
      let commentItem = document.createElement(`li`);
      commentItem.classList.add(`social__comment`);
      let avatarPicture = document.createElement(`img`);
      avatarPicture.classList.add(`social__picture`);
      avatarPicture.src = comments[i].avatar;
      avatarPicture.alt = comments[i].name;
      avatarPicture.width = 35;
      avatarPicture.height = 35;
      let commentText = document.createElement(`p`);
      commentText.classList.add(`social__text`);
      commentText.textContent = comments[i].message;
      commentList.appendChild(commentItem);
      commentItem.appendChild(avatarPicture);
      commentItem.appendChild(commentText);
    }
  };
  document.querySelector(`.social__comment-count`).classList.add(`hidden`);
  document.querySelector(`.comments-loader`).classList.add(`hidden`);
})();
