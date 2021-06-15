import fetch from './Fetch-movies.js';
import cardLibreryTpl from '../../templates/cardLibrary.hbs';
const refs = {
  main: document.querySelector('.library-cards'),
};

const fetchMovies = new fetch();

export default function (watched) {
  onMovieCardClickWatched(watched);
}

export function  featchFilmsByIdWatched() {
  let watchedForRender = JSON.parse(localStorage.getItem(`watched`)) || [];
  
  watchedForRender.forEach(element =>  {
    fetchMovies.getMovieDetaisById(element).then(response => {
      renderMarcupForWotchedFilms(response)
      console.log(response)
    })
  });
}

function onMovieCardClickWatched(watched) {
  watched = JSON.parse(localStorage.getItem(`watched`));
}

function renderMarcupForWotchedFilms(data) {
  refs.main.insertAdjacentHTML("beforeend", cardLibreryTpl(data));
}
