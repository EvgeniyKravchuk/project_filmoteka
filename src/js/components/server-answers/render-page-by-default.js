import FetchMovies from '../Fetch-movies';
import renderPage from './render-page-func';

const refs = {
  queryError: document.querySelector('.error_text'),
};

const movieService = new FetchMovies();
window.onload = function () {
  refs.queryError.style.display = 'none';
  movieService
    .fetchMainPopularMovies()
    .then(renderPage)
    .catch(error => onError(error));
};

function onError(error) {
    refs.queryError.style.display = 'block';
    console.error(error.message);
}
