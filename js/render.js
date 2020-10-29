'use strict';

(function () {
  const similarListElement = document.querySelector(`.pictures`);
  const similarPhotoTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);


  const renderPhoto = function (photo) {
    let photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

    return photoElement;
  };

  window.render = function (arr, arrLength) {

    let links = similarListElement.querySelectorAll(`.picture`);
    if (links.length > 0) {
      for (let i = 0; i < links.length; i++) {
        similarListElement.removeChild(links[i]);
      }

    }
    for (let i = 0; i < arrLength; i++) {
      let photo = renderPhoto(arr[i]);
      similarListElement.appendChild(photo);

      photo.addEventListener(`click`, function () {
        window.preview(arr[i]);
      });
    }
  };
})();
