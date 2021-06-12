import modalTpl from '../../templates/modal.hbs';
import FetchMovies from './Fetch-movies';

const fetchMovies = new FetchMovies();

const refs = {
  jsContainer: document.querySelector('.js_container'),
  backdrop: document.querySelector('.backdrop'),
  modal: document.querySelector('.modal-container'),
  closeModalBtn: document.querySelector('.modal-close-btn'),
};

let backdropEvtListner = 0;
let closeModalEscEvtListner = 0;

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
}

function closeModal() {
  refs.backdrop.removeEventListener('click', backdropEvtListner);
  window.removeEventListener('keydown', closeModalEscEvtListner);
  refs.backdrop.classList.remove('is-open');
  refs.modal.innerHTML = '';
}

function onBackdropClick(evt) {
  const nodeName = evt.target.nodeName;
  const classList = evt.target.classList;

  if (
    (nodeName === 'DIV' && classList.contains('backdrop')) ||
    (nodeName === 'BUTTON' && classList.contains('modal-close-btn'))
  ) {
    closeModal();
  }
}

function onBackdropEscClick(evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}