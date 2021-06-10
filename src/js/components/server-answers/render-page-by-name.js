import FetchMovies from '../Fetch-movies';
import renderPage from './render-page-func';
import { spinner } from './preloader';

const movieService = new FetchMovies();

const refs = {
  formInput: document.querySelector('form'),
  mainContainer: document.querySelector('.js_container'),
  queryError: document.querySelector('.error_text'),
};
refs.formInput.addEventListener('submit', onInputChange);

function onInputChange(event) {
  event.preventDefault();
  refs.queryError.style.display = 'none';
  const searchQuery = event.currentTarget.elements[0].value;
  const movieName = searchQuery.trim();
  refs.mainContainer.innerHTML = '';
  spinner.show();

  return movieService
    .searchMovie(movieName)
    .then(renderPageByName)
    .then(() => {
      spinner.close();
    })
    .catch(onError);
}

function onError(error) {
  spinner.close();
  refs.queryError.style.display = 'block';
  console.error(error.message);
}

function renderPageByName(data) {
  if (!data.results.length) {
    refs.queryError.style.display = 'block';
    spinner.close();
  } else {
    return renderPage(data);
  }
}

