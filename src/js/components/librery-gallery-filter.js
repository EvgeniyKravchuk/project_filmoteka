import { featchFilmsByIdWatched, featchFilmsByIdQueue } from './librery-render-marcup';

const refs = {
  watchedBtn: document.querySelector('.js_btn_w'),
  queueBtn: document.querySelector('.js_btn_q'),
  cardsList: document.querySelector('.library-cards'),
  main: document.querySelector('.js_container'),
};

const watched = JSON.parse(localStorage.getItem(`watched`));
const queue = JSON.parse(localStorage.getItem(`queue`));

if (localStorage.getItem('activeButton') === 'queue') {
  refs.cardsList.innerHTML = '';
  featchFilmsByIdQueue(queue);
  refs.queueBtn.classList.add('current_btn');
  refs.watchedBtn.classList.remove('current_btn');
}

refs.watchedBtn.addEventListener('click', sortFilmsForWatched);
refs.queueBtn.addEventListener('click', sortFilmsForQueue);

function sortFilmsForWatched(evt) {
  if (evt.currentTarget.classList.contains('current_btn')) {
    return;
  } else if (refs.queueBtn.classList.contains('current_btn')) {
    refs.queueBtn.classList.remove('current_btn');
    switchCurrentBtn(evt);
    refs.cardsList.innerHTML = '';
    featchFilmsByIdWatched(watched);
    localStorage.setItem('activeButton', 'watched');
  }
}

function sortFilmsForQueue(evt) {
  if (evt.currentTarget.classList.contains('current_btn')) {
    return;
  } else {
    switchCurrentBtn(evt);
    refs.watchedBtn.classList.remove('current_btn');
    refs.cardsList.innerHTML = '';
    featchFilmsByIdQueue(queue);
    localStorage.setItem('activeButton', 'queue');
  }
}

function switchCurrentBtn(evt) {
  if (
    (evt.currentTarget === refs.watchedBtn && !refs.watchedBtn.classList.contains('current_btn')) ||
    (evt.currentTarget === refs.queueBtn && !refs.queueBtn.classList.contains('current_btn'))
  ) {
    evt.currentTarget.classList.add('current_btn');
  } else {
    evt.currentTarget.classList.remove('current_btn');
  }
}

////delete cards

refs.main.addEventListener('click', deleteCardsFromLibrary);

function deleteCardsFromLibrary(evt) {
  const cardRef = evt.target.closest('.card-item');

  if (cardRef && localStorage.getItem('activeButton') === 'watched') {
    let imageId = cardRef.querySelector('.card-image').dataset.id;

    localStorageIdSetToWatched();

    if (document.documentElement.clientWidth > 1024) {
      deleteFilmId(imageId);
      cardRef.remove();
    } else if (cardRef.classList.contains('open')) {
      cardRef.classList.remove('open');
      cardRef.remove();
      deleteFilmId(imageId);
    } else {
      cardRef.classList.add('open');
    }
  } else if (cardRef && localStorage.getItem('activeButton') === 'queue') {
    let imageId = cardRef.querySelector('.card-image').dataset.id;

    localStorageIdSetToQueue();

    if (document.documentElement.clientWidth > 1024) {
      deleteFilmId(imageId);
      cardRef.remove();
    } else if (cardRef.classList.contains('open')) {
      cardRef.classList.remove('open');
      cardRef.remove();
      deleteFilmId(imageId);
    } else {
      cardRef.classList.add('open');
    }

    // document.location.reload();
  } else {
    return;
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

function localStorageIdSetToWatched() {
  localStorage.setItem('watched', JSON.stringify(watched));
}
function localStorageIdSetToQueue() {
  localStorage.setItem('queue', JSON.stringify(queue));
}
