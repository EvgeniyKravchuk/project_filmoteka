import MovieCardTemplate from './templates/card.hbs';
const refs = {
  mainContainer: document.querySelector('.js_container'),
};
export default function renderPage(movies) {
    const markup = MovieCardTemplate(movies);
    refs.mainContainer.insertAdjacentHTML('beforeend', markup);
}
