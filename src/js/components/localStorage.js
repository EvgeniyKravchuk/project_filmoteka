import libreryRenderMarcup from './librery-render-marcup';

export default function () {
  //прописать переменные с баттонами

  const refs = {
    buttonToW: document.querySelector('.js-watched'),
    buttonToQ: document.querySelector('.js-queue'),
    imageModal: document.querySelector('.modal-poster'),
  };

  //создать 2 хранилища локалСтореджа
  let watched = JSON.parse(localStorage.getItem(`watched`)) || [];
  let queue = JSON.parse(localStorage.getItem(`queue`)) || [];

  const labelAddW = 'Add to watched';
  const labelRemoveW = 'Remove from watched';
  const labelAddQ = 'Add to queue';
  const labelRemoveQ = 'Remove from queue';

  //получить id при открытии модалки
  getButtonOnLocalStorage();
  getButtonQueueOnLocalStorage();

  function onMovieCardClickWatched(evt) {
    let filmId = refs.imageModal.dataset.id;

    switchNameButtonWathced(filmId);
    pushFilmId(filmId);
    localStorageIdSetToWatched();
    // libreryRenderMarcup(watched);
  }

  function onMovieCardClickQueue(evt) {
    let filmId = refs.imageModal.dataset.id;

    switchNameButtonQueue(filmId);
    pushFilmIdQueue(filmId);
    localStorageIdSetToQueue();
    // libreryRenderMarcup(queue);
  }

  //записать id и поменять название кнопки на remove
  function localStorageIdSetToWatched() {
    localStorage.setItem('watched', JSON.stringify(watched));
  }
  function localStorageIdSetToQueue() {
    localStorage.setItem('queue', JSON.stringify(queue));
  }

  function pushFilmId(id) {
    if (!watched.includes(id)) {
      watched.push(id);
    } else {
      deleteFilmId(id);
    }
  }

  function pushFilmIdQueue(id) {
    if (!queue.includes(id)) {
      queue.push(id);
    } else {
      deleteFilmIdQueue(id);
    }
  }

  function deleteFilmId(id) {
    watched.forEach((element, index) => {
      if (element === id) {
        watched.splice(index, 1);
      }
    });
  }
  function deleteFilmIdQueue(id) {
    queue.forEach((element, index) => {
      if (element === id) {
        queue.splice(index, 1);
      }
    });
  }

  function switchNameButtonWathced() {
    const buttonText = refs.buttonToW.textContent.toLowerCase().trim();

    if (buttonText === labelAddW.toLowerCase()) {
      refs.buttonToW.textContent = labelRemoveW;
    } else {
      refs.buttonToW.textContent = labelAddW;
    }
  }
  function switchNameButtonQueue() {
    const buttonText = refs.buttonToQ.textContent.toLowerCase().trim();

    if (buttonText === labelAddQ.toLowerCase()) {
      refs.buttonToQ.textContent = labelRemoveQ;
    } else {
      refs.buttonToQ.textContent = labelAddQ;
    }
  }

  function getButtonOnLocalStorage() {
    if (watched.includes(refs.imageModal.dataset.id)) {
      refs.buttonToW.textContent = labelRemoveW;
    }
  }
  function getButtonQueueOnLocalStorage() {
    if (queue.includes(refs.imageModal.dataset.id)) {
      refs.buttonToQ.textContent = labelRemoveQ;
    }
  }

  refs.buttonToW.addEventListener('click', onMovieCardClickWatched);
  refs.buttonToQ.addEventListener('click', onMovieCardClickQueue);
}
