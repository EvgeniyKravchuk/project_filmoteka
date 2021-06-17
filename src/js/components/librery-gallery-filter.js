import { featchFilmsByIdWatched, featchFilmsByIdQueue } from './librery-render-marcup';
import modalTpl from '../../templates/modal.hbs';
import { spinner } from '../../js/components/server-answers/preloader';
import FetchMovies from './Fetch-movies';
import local from './localStorage.js';

const fetchMovies = new FetchMovies();

const refs = {
  watchedBtn: document.querySelector('.js_btn_w'),
  queueBtn: document.querySelector('.js_btn_q'),
  cardsList: document.querySelector('.library-cards'),
  main: document.querySelector('.js_container'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal-container'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
  body: document.querySelector('.js-body'),
};

const watched = JSON.parse(localStorage.getItem(`watched`));
const queue = JSON.parse(localStorage.getItem(`queue`));

let backdropEvtListner = 0;
let closeModalEscEvtListner = 0;
let cardRefForDelete;

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

////💀 ON CARD CLICK (FOR MODAL)

refs.main.addEventListener('click', deleteCardsFromLibrary);

function deleteCardsFromLibrary(evt) {
  const cardRef = evt.target.closest('.card-item');
  cardRefForDelete = cardRef;

  if (cardRef && localStorage.getItem('activeButton') === 'watched') {
    let imageId = cardRef.querySelector('.card-image').dataset.id;

    refs.backdrop.classList.add('is-open');

    openModalOnClick(imageId);
  } else if (cardRef && localStorage.getItem('activeButton') === 'queue') {
    let imageId = cardRef.querySelector('.card-image').dataset.id;

    refs.backdrop.classList.add('is-open');

    openModalOnClick(imageId);
  } else {
    return;
  }
}

function openModalOnClick(id) {
  fetchMovies.getMovieDetaisById(id).then(openModal).catch(console.log);
}

function openModal(data) {
  refs.modal.innerHTML = modalTpl(data);
  backdropEvtListner = refs.backdrop.addEventListener('click', onBackdropClick);
  closeModalEscEvtListner = window.addEventListener('keydown', onBackdropEscClick);
  refs.body.classList.add('is-hidden');
  local();
}

function closeModal() {
  refs.backdrop.removeEventListener('click', backdropEvtListner);
  window.removeEventListener('keydown', closeModalEscEvtListner);
  refs.backdrop.classList.remove('is-open');
  refs.body.classList.remove('is-hidden');
  refs.modal.innerHTML = '';
}

function onBackdropClick(evt) {
  const nodeName = evt.target.nodeName;
  const classList = evt.target.classList;
  const watchedButton = evt.target.closest('.js-watched');
  const queueButton = evt.target.closest('.js-queue');

  if (
    (nodeName === 'DIV' && classList.contains('backdrop')) ||
    (nodeName === 'svg' && classList.contains('close-button-image')) ||
    nodeName === 'use'
  ) {
    closeModal();
  } else if (watchedButton && refs.watchedBtn.classList.contains('current_btn')) {
    cardRefForDelete.style.display = 'none';

    watchedButton.classList.toggle('added');

    if (watchedButton && watchedButton.classList.contains('added')) {
      cardRefForDelete.style.display = 'block';
    }
  } else if (queueButton && refs.queueBtn.classList.contains('current_btn')) {
    cardRefForDelete.style.display = 'none';

    queueButton.classList.toggle('added');

    if (queueButton && queueButton.classList.contains('added')) {
      cardRefForDelete.style.display = 'block';
    }
  } else {
    return;
  }
}

function onBackdropEscClick(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
