import FetchMovies from '../Fetch-movies';
import renderPage from './render-page-func';
import { spinner } from './preloader';
import renderPaginationBody from '../pagination'

const refs = {
  queryError: document.querySelector('.error_text'),
};

const movieService = new FetchMovies();
window.onload = function () {
  refs.queryError.style.display = 'none';
  spinner.show();
  return movieService
    .fetchMainPopularMovies()
    .then(data => {
      renderPage(data);
      localStorage.setItem('pageType', 'default')
      return data;
    })
    .then(renderPaginationBody)
    .then(() => {
      spinner.close();
    })
    .catch(error => console.log(error));
};


