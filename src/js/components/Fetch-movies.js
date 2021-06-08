import axios from "axios";

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

    fetchMainPopularMovies() {
        this._popularMoviesPage = 1;
        const res = this._fetchMostPopularMovies()
        this._popularMoviesPage += 1;
        return res;
    }

    fetchNextPopularMovies() {
        const res = this._fetchMostPopularMovies()
        this._popularMoviesPage += 1;
        return res;
    }

    fetchPrevPopularMovies() {
        this._popularMoviesPage -= 2;
        const res = this._fetchMostPopularMovies()
        this._popularMoviesPage += 1;
        return res;
    }

    fetchCertainPopularMoviesPage(numberOfPage) {
        this._popularMoviesPage = numberOfPage;
        const res = this._fetchMostPopularMovies()
        this._popularMoviesPage += 1;
        return res;
    }

    searchMovie(movieName) {
        this._queryByNamePage = 1;
        const res = this._fetchMovieByName(movieName);
        this._queryByNamePage += 1;
        return res;
    }

    nextSearchedMoviePage() {
        const res = this._fetchMovieByName(this._searchQuery)
        this._queryByNamePage += 1;
        return res;
    }

    certainSearchedMoviePage(numberOfPage) {
        this._queryByNamePage = numberOfPage;
        const res = this._fetchMovieByName(this._searchQuery)
        this._queryByNamePage += 1;
        return res;
    }

    prevSearchedMoviePage() {
        this._queryByNamePage -= 2;
        const res = this._fetchMovieByName(this._searchQuery)
        this._queryByNamePage += 1;
        return res;
    }

    switchLang() {
        this.lang === 'en-US' ? this.lang = 'cu' : this.lang = 'en-US';
    }

    switchAdult() {
        this.adult ? this.adult = false : this.adult = true;
    }


    async getMovieDetaisById(id) {
        const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${this.lang}`)
        return res.data;
    }

    async _fetchMovieByName(query) {
        this._searchQuery = query;
        const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${this._searchQuery}&language=${this.lang}&page=${this._queryByNamePage}&include_adult=${this.adult}`)
        return res.data;
    }

    async _fetchMostPopularMovies() {
        const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=${this.lang}&page=${this.page}`)
        return res.data;
    }
}