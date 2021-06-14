import FetchMovies from './Fetch-movies';
import renderPage from './server-answers/render-page-func';
import renderPaginationBody from './pagination'


const fetchMovies = new FetchMovies();
const mainContainer = document.querySelector('.js_container')

const refs = {
  navContainer: document.querySelector('.pagination-nav'),
};

refs.navContainer.addEventListener('click', onPaginationClick);

async function onPaginationClick(evt) {
  const evtClasslist = evt.target.classList;
  if (evtClasslist.contains('pagination-item') || evtClasslist.contains('pagination-total')) {
    const page = Number(evt.target.dataset.page);
    const data = await fetchMovies.fetchCertainPopularMoviesPage(page);
    mainContainer.innerHTML = '';
    renderPage(data);
    renderPaginationBody(data);
  }

  if(evtClasslist.contains('pagination-prev')) {
    const data = await fetchMovies.fetchPrevPopularMovies()
    mainContainer.innerHTML = '';
    renderPage(data)
    renderPaginationBody(data);
  }

  if(evtClasslist.contains('pagination-next')) {
    const data = await fetchMovies.fetchNextPopularMovies()
    mainContainer.innerHTML = '';
    renderPage(data);
    renderPaginationBody(data);
  }
}
