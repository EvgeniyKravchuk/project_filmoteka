import cardListTemplate from '../../../templates/cardsList.hbs';
import FetchMovies from '../Fetch-movies';
import debounce from 'lodash.debounce';
import cardFilmTemlate from '../../../templates/singleCard.hbs';
import renderPaginationBody from '../pagination';

const refs = {
  mainInput: document.querySelector('.js_search_input'),
  queryError: document.querySelector('.error_text'),
  liveSearchContainer: document.querySelector('.live-search-wrapper'),
  mainContainer: document.querySelector('.js_container'),
};

refs.mainInput.addEventListener('input', debounce(onInputChange, 500));

const movieService = new FetchMovies();
function onInputChange(e) {
  refs.queryError.style.display = 'none';
  const searchQuery = e.target.value;
  refs.liveSearchContainer.innerHTML = '';
  const movieName = searchQuery.trim();

  if (searchQuery === '') {
    return;
  }
  return movieService
    .searchMovie(movieName)
    .then(renderListTitle)
    .catch(error => console.log(error));
}

function renderListTitle(body) {
  const markup = cardListTemplate(body.results);
  refs.liveSearchContainer.insertAdjacentHTML('beforeend', markup);
}

refs.liveSearchContainer.addEventListener('click', onDropDownListClick);

function onDropDownListClick(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  const filmId = event.target.attributes['filmId'].nodeValue;
  return movieService
    .getMovieDetaisById(filmId)
    .then(mockImage)
    .then(data => {
      renderFilm(data);
      return data;
    })
    .then(renderPaginationBody)
    .then(clearList)
    .then(() => (refs.mainInput.value = ''))
    .catch(error => console.log(error));
}

function renderFilm(data) {
  data.release_date = data.release_date.slice(0, 4);
  const markup = cardFilmTemlate([data]);
  refs.mainContainer.innerHTML = '';
  refs.mainContainer.insertAdjacentHTML('beforeend', markup);
}

function clearList() {
  refs.liveSearchContainer.innerHTML = '';
}
function mockImage(response) {
  if (!response.poster_path) {
    response.poster_path =
      'https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg';
    return response;
  }
  return response;
}

export { mockImage };
