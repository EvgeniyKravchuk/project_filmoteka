import MovieCardTemplate from '../../../templates/card.hbs';
const refs = {
  mainContainer: document.querySelector('.js_container'),
  header: document.querySelector('.header'),
};

export default function renderPage(body) {
  const markup = MovieCardTemplate(body.results);
  refs.mainContainer.insertAdjacentHTML('beforeend', markup);
  refs.header.scrollIntoView({ block: 'start', behavior: 'smooth' });
}
