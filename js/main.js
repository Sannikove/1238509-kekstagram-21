'use strict';

const COMMENTS__LIST = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const AUTORS = [`Лама в Панаме`, `Ки$$a`, `ПрИнЦесСкА`, `PloHish`, `КоТэ С NoЖом`, `ШуршуПакетом`];
const similarListElement = document.querySelector(`.pictures`);
const similarphotoTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
// открытие и закрытие окна редактирования изображения
const openUpload = document.querySelector(`#upload-file`);
const closeUpload = document.querySelector(`#upload-cancel`);
const imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
const body = document.querySelector(`body`);
//  наложение фильтров на изображение
const levelBar = document.querySelector(`.img-upload__effect-level`);
const preview = document.querySelector(`.img-upload__preview`).querySelector(`img`);
const formUpload = document.querySelector(`.img-upload__form`);
const pinSlider = document.querySelector(`.effect-level__pin`);
const sliderInput = document.querySelector(`.effect-level__value`);
const sliderLenght = 100;
//  масштабирование изображения
const scaleControlSmaller = document.querySelector(`.scale__control--smaller`);
const scaleControlBigger = document.querySelector(`.scale__control--bigger`);
const scaleControlValue = document.querySelector(`.scale__control--value`);
const scaleControlDefault = 100 + `%`;
const scaleControlMaxValue = 100;
const scaleControlMinValue = 25;
// валидация хэштегов:
const hashtagInput = document.querySelector(`.text__hashtags`);

//  функции рандомизации
const getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayElement = function (arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// добавление шаблонов изображений пользователей
const createComments = function () {
  let commentsArray = [];
  for (let i = 0; i < getRandomArbitrary(1, 5); i++) {
    commentsArray[i] = {
      avatar: `img/avatar-` + getRandomArbitrary(1, 6) + `.svg`,
      message: getRandomArrayElement(COMMENTS__LIST),
      name: getRandomArrayElement(AUTORS)
    };
  }
  return commentsArray;
};

const photoInfo = [];

for (let i = 0; i < 25; i++) {
  photoInfo[i] = {
    url: `photos/` + (i + 1) + `.jpg`,
    description: `описание фотографии`,
    likes: getRandomArbitrary(15, 200),
    comments: createComments().length
  };
}

const renderPhoto = function (photo) {
  let photoElement = similarphotoTemplate.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments;

  return photoElement;
};

const fragment = document.createDocumentFragment();

for (let i = 0; i < photoInfo.length; i++) {
  fragment.appendChild(renderPhoto(photoInfo[i]));
}
similarListElement.appendChild(fragment);

// открытие и закрытие окна редактирования изображения
const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
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

hashtagInput.addEventListener(`keydown`, function () {
  document.removeEventListener(`keydown`, onPopupEscPress);
});

//  наложение фильтров на изображение
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
    preview.className = ``;
    let filterClass = `effects__preview--` + evt.target.value;
    preview.classList.add(filterClass);
    getLevelEffect();
  }
};

formUpload.addEventListener(`change`, filterChangeHandler);
pinSlider.addEventListener(`mouseup`, getLevelEffect);

//  масштабирование изображения
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

// валидация хэштегов:
hashtagInput.addEventListener(`change`, function () {
  let hashtagArr = hashtagInput.value.split(` `);
  let re = /^#[\wа-яА-ЯЁё]+$/;
  let uniqHashtags = [];
  let lowerHashtag;

  for (let i = 0; i < hashtagArr.length; i++) {
    if (!re.test(hashtagArr[i])) {
      hashtagInput.setCustomValidity(`Не валидное значение: ` + hashtagArr[i] + `. Хештег должен начинаться с # и состоять из букв и чисел, и не может содержать спецсимволы.`);
      break;
    } else if (hashtagArr[i].length > 20) {
      hashtagInput.setCustomValidity(`Не валидное значение: ` + hashtagArr[i] + `. Хештег не может быть длиннее 20 символов.`);
      break;
    } else {
      hashtagInput.setCustomValidity(``);
    }

    lowerHashtag = hashtagArr[i].toLowerCase();
    if (uniqHashtags.includes(lowerHashtag)) {
      hashtagInput.setCustomValidity(`Хештег ` + lowerHashtag + ` введен дважды. Один и тот же хэш-тег не может повторяться.`);
      break;
    }
    uniqHashtags.push(lowerHashtag);
  }

  if (hashtagArr.length > 5) {
    hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
  }
});
