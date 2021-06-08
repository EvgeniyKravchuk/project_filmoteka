import FetchMovies from '../Fetch-movies';
import renderPage from './render-page-func';

const movieService = new FetchMovies();

const refs = {
    formInput: document.querySelector('form'),
    mainContainer: document.querySelector('.js_container'),
};

refs.formInput.addEventListener('submit', onInputChange);

function onInputChange(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements[0].value;
    const movieName = searchQuery.trim();
    refs.mainContainer.innerHTML = '';
  return movieService
    .searchMovie(movieName)
    .then(renderPage)
    .catch(error => console.log(error));
}
