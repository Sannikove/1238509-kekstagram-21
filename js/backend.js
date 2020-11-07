'use strict';
(function () {
  const TIMEOUT_IN_MS = 10000;
  const POST_URL = `https://21.javascript.pages.academy/kekstagram`;
  const GET_URL = `https://21.javascript.pages.academy/kekstagram/data`;
  const StatusCode = {
    OK: 200
  };

  const getXhr = function (method, URL, data, onLoad, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, URL);
    xhr.send(data);
  };

  const onContentSend = function (data, onLoad, onError) {
    getXhr(`POST`, POST_URL, data, onLoad, onError);
  };

  const onContentLoad = function (onLoad, onError) {
    getXhr(`GET`, GET_URL, null, onLoad, onError);
  };

  window.backend = {
    onContentSend,
    onContentLoad
  };
})();

