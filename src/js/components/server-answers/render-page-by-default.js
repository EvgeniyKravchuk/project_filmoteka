import FetchMovies from './js/Fetch-movies';
import renderPage from './render-page-function';

const movieService = new FetchMovies();
window.onload = function () {
    movieService
      .fetchMainPopularMovies()
      .then(renderPage)
      .catch(error => console.log(error));
};
