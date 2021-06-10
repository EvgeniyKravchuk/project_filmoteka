import MovieCardTemplate from '../../../templates/card.hbs';
const refs = {
  mainContainer: document.querySelector('.js_container'),
  queryError: document.querySelector('.error_text'),
};
export default function renderPage(body) {
  const markup = MovieCardTemplate(body.results);
  refs.mainContainer.insertAdjacentHTML('beforeend', markup);
}