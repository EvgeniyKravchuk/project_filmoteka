import fetch from './Fetch-movies.js';
import cardLibreryTpl from '../../templates/cardLibrary.hbs';

const refs = {
  main: document.querySelector('.library-cards'),
};

const fetchMovies = new fetch();

export default function (watched, queue) {
  onMovieCardClickWatched(watched);
  onMovieCardClickQueue(queue);
}

export function featchFilmsByIdWatched() {
  let watchedForRender = JSON.parse(localStorage.getItem(`watched`)) || [];

  watchedForRender.forEach(element => {
    fetchMovies.getMovieDetaisById(element).then(response => {
      renderMarcupForWotchedFilms(response);
    });
  });
}

export function featchFilmsByIdQueue() {
  let queueForRender = JSON.parse(localStorage.getItem(`queue`)) || [];

  queueForRender.forEach(element => {
    fetchMovies.getMovieDetaisById(element).then(response => {
      renderMarcupForQueueFilms(response);
    });
  });
}

function onMovieCardClickWatched(watched) {
  watched = JSON.parse(localStorage.getItem(`watched`));
}
function onMovieCardClickQueue(queue) {
  queue = JSON.parse(localStorage.getItem(`queue`));
}

function renderMarcupForWotchedFilms(data) {
  refs.main.insertAdjacentHTML('beforeend', cardLibreryTpl(data));
}
function renderMarcupForQueueFilms(data) {
  refs.main.insertAdjacentHTML('beforeend', cardLibreryTpl(data));
}

export function renderQueueIfTheyActive() {
  if (localStorage.getItem('activeButton') === 'queue') {
    return;
  } else {
    featchFilmsByIdWatched();
  }
}
