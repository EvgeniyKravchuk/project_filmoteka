import fetchMovies from './Fetch-movies.js';
import createLocalStoregeArrays from './movie-details';

console.log(createLocalStoregeArrays);
const fetchMoviesNew = new fetchMovies();

// getMovieDetaisById(id)

export default function () {
  //прописать переменные с баттонами
  console.log();
  const refs = {
    buttonToW: document.querySelector('.js-watched'),
    buttonToQ: document.querySelector('.js-queue'),
    imageModal: document.querySelector('.modal-poster'),
  };

  //создать 2 хранилища локалСтореджа
  let watched = JSON.parse(localStorage.getItem(`watched`)) || [];

  let indexOfElW = 0;

  //создать переменные для названия баттонов
  const classNameActive = 'modalBtnWat-active';
  const labelAddW = 'Add to watched';
  const labelRemoveW = 'Remove from watched';
  const labelAddQ = 'Add to watched';
  const labelRemoveQ = 'Remove from watched';

  //получить id при открытии модалки
  getButtonOnLocalStorage();

  function onMovieCardClickWatched(evt) {
    let filmId = refs.imageModal.dataset.id;
    // addFilmToWatched();
    switchNameButtonWattced(filmId);
    pushFilmId(filmId);
    localStorageIdSetToWatched();
  }

  //записать id и поменять название кнопки на remove
  function localStorageIdSetToWatched() {
    localStorage.setItem('watched', JSON.stringify(watched));
  }

  function pushFilmId(id) {
    if (!watched.includes(id)) {
      watched.push(id);
    } else {
      deleteFilmId(id);
    }
  }

  function deleteFilmId(id) {
    watched.forEach((element, index) => {
      if (element === id) {
        watched.splice(index, 1);
      }
    });
  }

  function switchNameButtonWattced() {
    const buttonText = refs.buttonToW.textContent.toLowerCase().trim();

    if (buttonText === labelAddW.toLowerCase()) {
      refs.buttonToW.textContent = labelRemoveW;
    } else {
      refs.buttonToW.textContent = labelAddW;
    }
  }

  function getButtonOnLocalStorage() {
    if (watched.includes(refs.imageModal.dataset.id)) {
      refs.buttonToW.textContent = labelRemoveW;
    }
  }

  refs.buttonToW.addEventListener('click', onMovieCardClickWatched);

  //написать функцию кнопки watched по клику:
  //-если имя кнопки remove-удалить id, поменять название кнопки на add
  //переписать данные в локалсторедж
  //зарендерить карточку в либрери
  //или запушить id
  //поменять название кнопки на remove
  //переписать данные в локалсторедж
  //зарендерить карточку в либрери

  // const classNameActive = 'modalBtnWat-active';
  // const labelAdd = 'Add to watched';
  // const labelRemove = 'Remove from watched';
}

// import fetchMovies from './Fetch-movies.js';
// import createLocalStoregeArrays from './movie-details';
// console.log(createLocalStoregeArrays);
// const fetchMoviesNew = new fetchMovies();

// // getMovieDetaisById(id)

// export default function (arrayWithFilnIdW, arrayWithFilnIdQ) {
//   //прописать переменные с баттонами
//   console.log();
//   const ref = {
//     buttonToW: document.querySelector('.js-watched'),
//     buttonToQ: document.querySelector('.js-queue'),
//     imageModal: document.querySelector('.modal-poster'),
//   };

//   //создать 2 хранилища локалСтореджа
//   // let watched = localStorage.getItem(`watched`) || [];
//   // let queue = localStorage.getItem(`queue`) || [];

//   let indexOfElW = '';
//   let indexOfElQ = '';

//   //создать переменные для названия баттонов
//   const classNameActive = 'modalBtnWat-active';
//   const labelAddW = 'Add to watched';
//   const labelRemoveW = 'Remove from watched';
//   const labelAddQ = 'Add to watched';
//   const labelRemoveQ = 'Remove from watched';

//   //получить id при открытии модалки

//   function onMovieCardClickWatched(evt) {
//     indexOfElW = ref.imageModal.dataset.id;

//     addFilmToWatched();
//     localStorageIdSetToWatched();
//   }

//   function onMovieCardClickQueue(evt) {
//     indexOfElQ = ref.imageModal.dataset.id;

//     addFilmToQueue();
//     localStorageIdSetToQueue();
//   }

//   //записать id и поменять название кнопки на remove
//   function localStorageIdSetToWatched() {
//     localStorage.setItem('watched', JSON.stringify(arrayWithFilnIdW));
//   }

//   function localStorageIdSetToQueue() {
//     localStorage.setItem('queue', JSON.stringify(arrayWithFilnIdQ));
//   }

//   function addFilmToWatched() {
//     if (arrayWithFilnIdW.includes(indexOfElW)) {
//       return;
//     } else {
//       arrayWithFilnIdW.push(indexOfElW);
//     }
//   }

//   function addFilmToQueue() {
//     if (arrayWithFilnIdQ.includes(indexOfElQ)) {
//       return;
//     } else {
//       arrayWithFilnIdQ.push(indexOfElQ);
//     }
//   }
//   ref.buttonToW.addEventListener('click', onMovieCardClickWatched);
//   ref.buttonToQ.addEventListener('click', onMovieCardClickQueue);

//   // let watchedStr = JSON.stringify(indexOfElQArray);
//   // localStorage.setItem('watched', watchedStr);

//   //написать функцию кнопки watched по клику:
//   //-если имя кнопки remove-удалить id, поменять название кнопки на add
//   //переписать данные в локалсторедж
//   //зарендерить карточку в либрери
//   //или запушить id
//   //поменять название кнопки на remove
//   //переписать данные в локалсторедж
//   //зарендерить карточку в либрери

//   // const classNameActive = 'modalBtnWat-active';
//   // const labelAdd = 'Add to watched';
//   // const labelRemove = 'Remove from watched';
// }
