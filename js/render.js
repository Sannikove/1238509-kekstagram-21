'use strict';

(function () {
  const similarListElement = document.querySelector(`.pictures`);
  const similarPhotoTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const MAX_PHOTO_COUNT = 25;

  const renderPhoto = function (photo) {
    let photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return photoElement;
  };

  // window.render = function (photos) {
  //   const takeNumber = photos.length > MAX_PHOTO_COUNT
  //     ? MAX_PHOTO_COUNT
  //     : photos.length;

  //   const fragment = document.createDocumentFragment();

  //   for (let i = 0; i < takeNumber; i++) {
  //     fragment.appendChild(renderPhoto(photos[i]));
  //   }

  //   similarListElement.appendChild(fragment);
  // };

  window.render = function (photos) {
    let takeNumber = photos.length > MAX_PHOTO_COUNT
      ? MAX_PHOTO_COUNT
      : photos.length;
    //  similarListElement.innerHTML = '';
    for (let i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderPhoto(photos[i]));
    }
  };
})();
