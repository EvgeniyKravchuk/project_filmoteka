import debounce from 'lodash.debounce';
import FetchMovies from './js/Fetch-movies';
import renderPage from './render-page-function';

const movieService = new FetchMovies();

const refs = {
  input: document.querySelector('.js_search_input'),
};

refs.input.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  const searchQuery = event.target.value;
  const movieName = searchQuery.trim();
  return movieService
    .searchMovie(movieName)
    .then(renderPage)
    .catch(error => console.log(error));
}



