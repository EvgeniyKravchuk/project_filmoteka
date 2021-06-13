import MovieCardTemplate from '../../../templates/card.hbs';
const refs = {
  mainContainer: document.querySelector('.js_container'),
  queryError: document.querySelector('.error_text'),
};
export default function renderPage(body) {
    const modifiedArr = body.results.map(res => {
      res.release_date = res.release_date.slice(0, 4);
      return res;
    });
  
  const markup = MovieCardTemplate(modifiedArr);
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