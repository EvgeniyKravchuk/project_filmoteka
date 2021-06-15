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

  const labelAddW = 'Add to watched';
  const labelRemoveW = 'Remove from watched';
  const labelAddQ = 'Add to watched';
  const labelRemoveQ = 'Remove from watched';

  //получить id при открытии модалки
  getButtonOnLocalStorage();

  function onMovieCardClickWatched(evt) {
    let filmId = refs.imageModal.dataset.id;

    switchNameButtonWattced(filmId);
    pushFilmId(filmId);
    localStorageIdSetToWatched();
    libreryRenderMarcup(watched);
  }

  //записать id и поменять название кнопки на remove
  function localStorageIdSetToWatched() {
    localStorage.setItem('watched', JSON.stringify(watched));
  }

  function pushFilmId(id) {
    if (!watched.includes(id)) {
      watched.push(id);
    } else {
      deleteFilmId(id);
    }
  }

  function deleteFilmId(id) {
    watched.forEach((element, index) => {
      if (element === id) {
        watched.splice(index, 1);
      }
    });
  }

  function switchNameButtonWattced() {
    const buttonText = refs.buttonToW.textContent.toLowerCase().trim();

    if (buttonText === labelAddW.toLowerCase()) {
      refs.buttonToW.textContent = labelRemoveW;
    } else {
      refs.buttonToW.textContent = labelAddW;
    }
  }

  function getButtonOnLocalStorage() {
    if (watched.includes(refs.imageModal.dataset.id)) {
      refs.buttonToW.textContent = labelRemoveW;
    }
  }

  refs.buttonToW.addEventListener('click', onMovieCardClickWatched);
}
