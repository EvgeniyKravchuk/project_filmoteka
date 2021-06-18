import FetchMovies from '../Fetch-movies';
import renderPage from './render-page-func';
import { spinner } from './preloader';
import renderPaginationBody from '../pagination';

const movieService = new FetchMovies();

const refs = {
  formInput: document.querySelector('form'),
  mainContainer: document.querySelector('.js_container'),
  queryError: document.querySelector('.error_text'),
  liveSearchContainer: document.querySelector('.live-search-wrapper'),
  mainInput: document.querySelector('.js_search_input'),
};
refs.formInput.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements[0].value;
  const movieName = searchQuery.trim();
  refs.mainContainer.innerHTML = '';
  spinner.show();

  if (searchQuery === '') {
    return movieService
      .fetchMainPopularMovies()
      .then(renderPage)
      .then(() => {
        spinner.close();
      })
      .then(() => (refs.queryError.style.display = 'block'))
      .catch(error => console.log(error));
  }

  return movieService
    .searchMovie(movieName)
    .then(mockImage)
    .then(data => {
      renderPageByName(data);
      localStorage.setItem('pageType', 'byName');
      return data;
    })
    .then(renderPaginationBody)
    .then(() => {
      spinner.close();
    })
    .then(() => (refs.liveSearchContainer.innerHTML = ''))
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

function mockImage(response) {
  response.results = response.results.map(element => {
    if (!element.poster_path) {
      element.poster_path = 'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg';
    }
    return element;
  });
  return response;
}

