import cardListTemplate from '../../../templates/cardsList.hbs';
import FetchMovies from '../Fetch-movies';

const refs = {
  mainInput: document.querySelector('.js_search_input'),
  queryError: document.querySelector('.error_text'),
  cardListContainer: document.querySelector('.card-list'),
};

refs.mainInput.addEventListener('input', onInputChange);
const movieService = new FetchMovies();
function onInputChange(e) {
  refs.queryError.style.display = 'none';
    const searchQuery = e.target.value;
     refs.cardListContainer.innerHTML = '';
  console.log(searchQuery);
  const movieName = searchQuery.trim();

  return movieService
    .searchMovie(movieName)
    .then(renderListTitle)
    .catch(error => console.log(error));
}

function renderListTitle(body) {
  const markup = cardListTemplate(body.results);
  refs.cardListContainer.insertAdjacentHTML('beforeend', markup);
}
