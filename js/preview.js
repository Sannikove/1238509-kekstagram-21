'use strict';

(function () {
  const DEFAULT_COMMENTS_LISTED = 5;
  const FIRST_COMMENT_INDEX = 0;
  const AVATAR_SIZE = 35;
  const bigPictureContainer = document.querySelector(`.big-picture`);
  const bigPicture = bigPictureContainer.querySelector(`.big-picture__img`);
  const commentList = document.querySelector(`.social__comments`);
  const pictureCross = bigPictureContainer.querySelector(`#picture-cancel`);
  const commentsLoad = document.querySelector(`.comments-loader`);


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

    let counter = DEFAULT_COMMENTS_LISTED;
    commentsLoad.classList.remove(`hidden`);
    if (counter > photo.comments.length) {
      counter = photo.comments.length;
      commentsLoad.classList.add(`hidden`);
    }
    let firstComment = DEFAULT_COMMENTS_LISTED;
    createCommentsList(photo.comments, FIRST_COMMENT_INDEX, counter);

    commentsLoad.addEventListener(`click`, function () {
      counter = counter + DEFAULT_COMMENTS_LISTED > photo.comments.length ? photo.comments.length : counter + DEFAULT_COMMENTS_LISTED;
      createCommentsList(photo.comments, firstComment, counter);
      firstComment += DEFAULT_COMMENTS_LISTED;

      let newList = document.querySelectorAll(`.social__comment`).length;
      if (newList === photo.comments.length) {
        commentsLoad.classList.add(`hidden`);
      }
    });

    openBigPicture();
  };

  const createCommentsList = function (comments, firstElement, counter) {
    for (let i = firstElement; i < counter; i++) {
      let commentItem = document.createElement(`li`);
      commentItem.classList.add(`social__comment`);
      let avatarPicture = document.createElement(`img`);
      avatarPicture.classList.add(`social__picture`);
      avatarPicture.src = comments[i].avatar;
      avatarPicture.alt = comments[i].name;
      avatarPicture.width = AVATAR_SIZE;
      avatarPicture.height = AVATAR_SIZE;
      let commentText = document.createElement(`p`);
      commentText.classList.add(`social__text`);
      commentText.textContent = comments[i].message;
      commentList.appendChild(commentItem);
      commentItem.appendChild(avatarPicture);
      commentItem.appendChild(commentText);
    }
  };

})();
