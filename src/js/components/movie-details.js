import modalTpl from '../../templates/modal.hbs';
import FetchMovies from './Fetch-movies';
import localStorage from './localStorage.js';
import { spinner } from '../../js/components/server-answers/preloader';
import { mockImage } from './server-answers/drop-down-list';

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

refs.jsContainer.addEventListener('click', onMovieCardClick);

function onMovieCardClick(evt) {
  const cardRef = evt.target.closest('.card-item');

  if (cardRef) {
    spinner.show();
    refs.backdrop.classList.add('is-open');
    spinner.close();
    const movieId = cardRef.querySelector('.card-image').dataset.id;
    fetchMovies.getMovieDetaisById(movieId).then(mockImage).then(openModal).catch(console.log);
  }
}

function openModal(data) {
  refs.modal.innerHTML = modalTpl(data);
  backdropEvtListner = refs.backdrop.addEventListener('click', onBackdropClick);
  closeModalEscEvtListner = window.addEventListener('keydown', onBackdropEscClick);
  refs.body.classList.add('is-hidden');
  localStorage();
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

  if (
    (nodeName === 'DIV' && classList.contains('backdrop')) ||
    (nodeName === 'svg' && classList.contains('close-button-image')) ||
    nodeName === 'use'
  ) {
    closeModal();
  }
}

function onBackdropEscClick(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}
