import MovieCardTemplate from '../../../templates/card.hbs';
const refs = {
  mainContainer: document.querySelector('.js_container'),
  queryError: document.querySelector('.error_text'),
};
export default function renderPage(results) {
  const markup = MovieCardTemplate(results);
  refs.mainContainer.insertAdjacentHTML('beforeend', markup);
}
