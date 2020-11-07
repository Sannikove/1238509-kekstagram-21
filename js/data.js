'use strict';

(function () {
  const MAX_RANDOM_PHOTO_COUNT = 10;
  let photos = [];
  const filter = document.querySelector(`.img-filters`);
  const filterButtons = filter.querySelectorAll(`.img-filters__button`);
  const filterDefaultButton = filter.querySelector(`#filter-default`);
  const filterRandomButton = filter.querySelector(`#filter-random`);
  const filterDiscussedButton = filter.querySelector(`#filter-discussed`);


  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener(`click`, function () {
      filterButtons[i].classList.add(`img-filters__button--active`);
      window.debounce(updatePhotos(filterButtons[i]));

      for (let j = 0; j < filterButtons.length; j++) {
        if (j !== i) {
          filterButtons[j].classList.remove(`img-filters__button--active`);

        }
      }
    });
  }

  const updatePhotos = function (btn) {
    if (btn === filterRandomButton) {
      let randomPhotos = [];
      let permutation = window.main.getRandomPermutation(photos.length);
      let temp = photos.slice();
      for (let i = 0; i < photos.length; i++) {
        randomPhotos[i] = temp[permutation[i]];
      }
      return window.render(randomPhotos, MAX_RANDOM_PHOTO_COUNT);

    } else if (btn === filterDiscussedButton) {
      let temp = photos.slice();
      let discussedPhotos = temp.sort(function (a, b) {
        return b.comments > a.comments ? 1 : -1;
      });
      return window.render(discussedPhotos, discussedPhotos.length);
    }

    const defaultPhotos = photos.slice();
    return window.render(defaultPhotos, defaultPhotos.length);
  };

  const onSuccess = function (data) {
    photos = data;
    updatePhotos(filterDefaultButton);
    filter.classList.remove(`img-filters--inactive`);
  };

  const onError= function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: black;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `20px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend.onContentLoad(onSuccess, onError);
})();
