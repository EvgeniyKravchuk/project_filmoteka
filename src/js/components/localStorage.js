import fetchMovies from './Fetch-movies';

const fetchMoviesNew = new fetchMovies();

// getMovieDetaisById(id)

export default function () {
  //прописать переменные с баттонами
  const ref = {
    buttonToW: document.querySelector('.js-watched'),
    buttonToQ: document.querySelector('.js-queue'),
    imageModal: document.querySelector('.modal-poster'),
  };

  //создать 2 хранилища локалСтореджа
  let watched = localStorage.getItem(`watched`) || [];
  let queue = localStorage.getItem(`queue`) || [];

  let indexOfElW = '';
  let indexOfElQ = '';
  let indexOfElWArray = [];
  let indexOfElQArray = [];

  //создать переменные для названия баттонов
  const classNameActive = 'modalBtnWat-active';
  const labelAddW = 'Add to watched';
  const labelRemoveW = 'Remove from watched';
  const labelAddQ = 'Add to watched';
  const labelRemoveQ = 'Remove from watched';

  ref.buttonToW.addEventListener('click', onMovieCardClickWatched);
  ref.buttonToQ.addEventListener('click', onMovieCardClickQueue);

  //получить id при открытии модалки

  function onMovieCardClickWatched(evt) {
    indexOfElW = ref.imageModal.dataset.id;
    console.log(indexOfElW);
    addFilmToWatched();
    localStorageIdSetToWatched();
    console.log(indexOfElWArray);
  }

  function onMovieCardClickQueue(evt) {
    indexOfElQ = ref.imageModal.dataset.id;
    console.log(indexOfElQ);
    addFilmToQueue();
    localStorageIdSetToQueue();
    console.log(indexOfElQArray);
  }

  //записать id и поменять название кнопки на remove
  function localStorageIdSetToWatched() {
    localStorage.setItem('watched', JSON.stringify(indexOfElWArray));
  }

  function localStorageIdSetToQueue() {
    localStorage.setItem('queue', JSON.stringify(indexOfElQArray));
  }

  function addFilmToWatched() {
    if (indexOfElWArray.includes(indexOfElW)) {
      return;
    } else {
      indexOfElWArray.push(indexOfElW);
    }
  }

  function addFilmToQueue() {
    if (indexOfElQArray.includes(indexOfElQ)) {
      return;
    } else {
      indexOfElQArray.push(indexOfElQ);
    }
  }

  // let watchedStr = JSON.stringify(indexOfElQArray);
  // localStorage.setItem('watched', watchedStr);
  //написать функцию кнопки watched по клику:
  //-если имя кнопки remove-удалить id, поменять название кнопки на add
  //переписать данные в локалсторедж
  //зарендерить карточку в либрери
  //или запушить id
  //поменять название кнопки на remove
  //переписать данные в локалсторедж
  //зарендерить карточку в либрери

  // buttonToW.addEventListener('click', onMovieCardClickWatched);
  // buttonToQ.addEventListener('click', onMovieCardClickQueue);

  // const classNameActive = 'modalBtnWat-active';
  // const labelAdd = 'Add to watched';
  // const labelRemove = 'Remove from watched';
}
