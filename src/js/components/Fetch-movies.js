import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '072ba5d3ab696b78ba3c61da98d3ebeb';

export default class FetchMovies {
  constructor() {
    this._popularMoviesPage = 1;
    this._queryByNamePage = 1;
    this._searchQuery = '';
    this.lang = 'en-US';
    this.adult = false;
  }

  async fetchMainPopularMovies() {
    this._popularMoviesPage = 1;
    const res = await this._fetchMostPopularMovies();
    return res;
  }

  async fetchNextPopularMovies() {
    this._popularMoviesPage += 1;
    const res = await this._fetchMostPopularMovies();
    return res;
  }

  async fetchPrevPopularMovies() {
    this._popularMoviesPage -= 1;
    const res = await this._fetchMostPopularMovies();
    return res;
  }

  async fetchCertainPopularMoviesPage(numberOfPage) {
    this._popularMoviesPage = numberOfPage;
    const res = await this._fetchMostPopularMovies();
    this._popularMoviesPage += 1;
    return res;
  }

  async searchMovie(movieName) {
    this._queryByNamePage = 1;
    this._searchQuery = movieName;
    localStorage.setItem('searchQuery', movieName);
    const res = await this._fetchMovieByName(movieName);

    return res;
  }

  async nextSearchedMoviePage() {
    this._searchQuery = localStorage.getItem('searchQuery');
    this._queryByNamePage++;
    const res = await this._fetchMovieByName(this._searchQuery);
    return res;
  }

  async certainSearchedMoviePage(numberOfPage) {
    this._searchQuery = localStorage.getItem('searchQuery');
    this._queryByNamePage = numberOfPage;
    const res = await this._fetchMovieByName(this._searchQuery);
    return res;
  }

  async prevSearchedMoviePage() {
    this._searchQuery = localStorage.getItem('searchQuery');
    this._queryByNamePage--;
    const res = await this._fetchMovieByName(this._searchQuery);
    return res;
  }

  switchLang() {
    this.lang === 'en-US' ? (this.lang = 'ru') : (this.lang = 'en-US');
  }

  switchAdult() {
    this.adult ? (this.adult = false) : (this.adult = true);
  }

  async getMovieDetaisById(id) {
    const {data} = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${this.lang}`);
    return data;
  }

  async _fetchMovieByName() {
    const {data} = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this._searchQuery}&language=${this.lang}&page=${this._queryByNamePage}&include_adult=${this.adult}`,
    );
    return data;
  }

  async _fetchMostPopularMovies() {
    const {data} = await axios.get(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${this.lang}&page=${this._popularMoviesPage}`,
    );
    const genres = await this._fetchGenresList();
    const genresIds = genres.map(genre => genre.id);
    const genresData = data.results.map(x => {
        return x.genre_ids.map(y => {
            return genres[genresIds.indexOf(y)].name
        });
    });
    data.results.forEach((el,i) => {
        if(el.release_date) {
          el.release_date = el.release_date.slice(0, 4)
        }
        el.genre_ids = genresData[i]
    });
    return data;
  }


  async _fetchGenresList() {
    const genres = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${this.lang}`,
    );
    return genres.data.genres;
  }
}
