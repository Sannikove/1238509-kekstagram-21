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

const getRandomArbitrary = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArrayElement = function (arr) {
  let rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

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
