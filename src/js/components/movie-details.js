import modalTpl from '../../templates/modal.hbs';
import FetchMovies from './Fetch-movies';
import localStorage from './localStorage.js';

const fetchMovies = new FetchMovies();

const refs = {
  jsContainer: document.querySelector('.js_container'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal-container'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
  body: document.querySelector('.js-body'),
};

let backdropEvtListner = 0;
let closeModalEscEvtListner = 0;
const arrayWithFilnIdW = [];
const arrayWithFilnIdQ = [];

refs.jsContainer.addEventListener('click', onMovieCardClick);

function onMovieCardClick(evt) {
  const cardRef = evt.target.closest('.card-item');

  if (cardRef) {
    refs.backdrop.classList.add('is-open');
    const movieId = cardRef.querySelector('.card-image').dataset.id;
    fetchMovies.getMovieDetaisById(movieId).then(openModal).catch(console.log);
  }
}

function openModal(data) {
  refs.modal.innerHTML = modalTpl(data);
  backdropEvtListner = refs.backdrop.addEventListener('click', onBackdropClick);
  closeModalEscEvtListner = window.addEventListener('keydown', onBackdropEscClick);
  refs.body.classList.add('is-hidden');
  localStorage(arrayWithFilnIdW, arrayWithFilnIdQ);
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
  console.log(nodeName);

  if (
    (nodeName === 'DIV' && classList.contains('backdrop')) ||
    (nodeName === 'svg' && classList.contains('close-button-image')) ||
    nodeName === 'use'
  ) {
    closeModal();
    console.log(nodeName);
  }
}

function onBackdropEscClick(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
//for LocalStorage
// function createLocalStoregeArrays() {
//   const arrayWithFilnId = [];
//   const array = arrayWithFilnId;
//   return array;
// }

// export default createLocalStoregeArrays;
