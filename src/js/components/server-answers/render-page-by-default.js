import FetchMovies from '../Fetch-movies';
import renderPage from './render-page-func';

const refs = {
  queryError: document.querySelector('.error_text'),
};

const movieService = new FetchMovies();
window.onload = function () {
  refs.queryError.style.display = 'none';
  return movieService
    .fetchMainPopularMovies()
    .then(renderPage)
    .catch(error => console.log(error));
};

