import MovieCardTemplate from '../../../templates/card.hbs';
const refs = {
  mainContainer: document.querySelector('.js_container'),
  queryError: document.querySelector('.error_text'),
};
export default function renderPage(body) {
  const markup = MovieCardTemplate(body.results);
  refs.mainContainer.insertAdjacentHTML('beforeend', markup);
  onshortString();
}

function onshortString() {
  const genresSpan = document.querySelectorAll('.genre-title');
  genresSpan.forEach(e => {
    const shortString = e.textContent.slice(0, -2);
    e.textContent = shortString;
  });
}