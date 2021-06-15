import cardListTemplate from '../../../templates/cardsList.hbs';
import FetchMovies from '../Fetch-movies';
import debounce from 'lodash.debounce';
import cardFilmTemlate from '../../../templates/singleCard.hbs';

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
    .then(renderFilm)
    .then(clearList)
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
