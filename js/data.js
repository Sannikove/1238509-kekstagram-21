'use strict';

(function () {
  let photos = [];
  const filter = document.querySelector(`.img-filters`);
  const filterButtons = filter.querySelectorAll(`.img-filters__button`);
  // const filterDefaultBtn = filter.querySelector(`#filter-default`);
  const filterRandomBtn = filter.querySelector(`#filter-random`);
  // const filterDiscussedBtn = filter.querySelector(`#filter-discussed`);


  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener(`click`, function () {
      filterButtons[i].classList.add(`img-filters__button--active`);
      updatePhotos();
      for (let j = 0; j < filterButtons.length; j++) {
        if (j !== i) {
          filterButtons[j].classList.remove(`img-filters__button--active`);

        }
      }
    });
  }

  const updatePhotos = function () {
    let newPhotos = [];
    if (filterRandomBtn.classList.contains(`img-filters__button--active`)) {
      let permutation = window.main.getRandomPermutation(photos.length);
      let temp = photos.slice();
      for (let i = 0; i < photos.length; i++) {
        newPhotos[i] = temp[permutation[i]];
      }
      newPhotos.length = 10;

      return window.render(newPhotos);


    } else {
      newPhotos = photos;
      return window.render(newPhotos);
    }
  };


  filter.classList.remove(`img-filters--inactive`);

  const successHandler = function (data) {
    photos = data;
    updatePhotos();
  };

  const errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: black;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `20px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.load(successHandler, errorHandler);
})();
