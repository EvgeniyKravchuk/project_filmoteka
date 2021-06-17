import FetchMovies from './Fetch-movies';
import renderPage from './server-answers/render-page-func';
import renderPaginationBody from './pagination'


const fetchMovies = new FetchMovies();
const mainContainer = document.querySelector('.js_container')

let pageType = null;

const refs = {
  navContainer: document.querySelector('.pagination-nav'),
};

refs.navContainer.addEventListener('click', onPaginationClick);

async function onPaginationClick(evt) {
  pageType = localStorage.getItem('pageType')
  const evtClasslist = evt.target.classList;
  if (evtClasslist.contains('pagination-item')) {
    const page = Number(evt.target.dataset.page);
    let data = null;
    if(pageType === 'default') {
      data = await fetchMovies.fetchCertainPopularMoviesPage(page);
    }
    if(pageType === 'byName') {
      data = await fetchMovies.certainSearchedMoviePage(page);
    }
    mainContainer.innerHTML = '';
    renderPage(data);
    renderPaginationBody(data);
  }

  if(evtClasslist.contains('pagination-prev')) {
    let data = null;
    if(pageType === 'default') {
      data = await fetchMovies.fetchPrevPopularMovies();
    }
    if(pageType === 'byName') {
      data = await fetchMovies.prevSearchedMoviePage();
    }
    mainContainer.innerHTML = '';
    renderPage(data)
    renderPaginationBody(data);
  }

  if(evtClasslist.contains('pagination-next')) {
    let data = null;
    if(pageType === 'default') {
      data = await fetchMovies.fetchNextPopularMovies();
    }
    if(pageType === 'byName') {
      data = await fetchMovies.nextSearchedMoviePage();
    }
    mainContainer.innerHTML = '';
    renderPage(data);
    renderPaginationBody(data);
  }
}
