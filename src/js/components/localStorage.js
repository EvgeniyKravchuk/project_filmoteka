export default function () {
  const buttonToW = document.querySelector('.js-watched');
  const buttonToQ = document.querySelector('.js-queue');

  buttonToW.addEventListener('click', onMovieCardClickWatched);
  buttonToQ.addEventListener('click', onMovieCardClickQueue);

  const classNameActive = 'modalBtnWat-active';
  const labelAdd = 'Add to watched';
  const labelRemove = 'Remove from watched';

  function onMovieCardClickWatched(e) {
    idCardW();

    console.log('clickW');
  }
  function onMovieCardClickQueue(e) {
    idCardQ();

    console.log('clickQ');
  }

  function idCardW(id) {
    const { pushMoviesW, moviesW } = putMovieWatched('23');
    if (pushMoviesW) {
      buttonToW.classList.add(classNameActive);
      buttonToW.textContent = labelRemove;
    } else {
      buttonToW.classList.remove(classNameActive);
      buttonToW.textContent = labelAdd;
    }
  }

  function idCardQ(id) {
    const { pushMoviesQ, moviesQ } = putMovieQueue('30');
    if (pushMoviesQ) {
      buttonToQ.classList.add(classNameActive);
      buttonToQ.textContent = labelRemove;
    } else {
      buttonToQ.classList.remove(classNameActive);
      buttonToQ.textContent = labelAdd;
    }
  }

  const keyW = 'w';
  const keyQ = 'q';

  function getMovieWatched() {
    const movieLocalStorageW = localStorage.getItem(keyW);

    if (movieLocalStorageW !== null) {
      return JSON.parse(movieLocalStorageW);
    }
    return [];
  }

  function getMovieQueue() {
    const movieLocalStorageQ = localStorage.getItem(keyQ);

    if (movieLocalStorageQ !== null) {
      return JSON.parse(movieLocalStorageQ);
    }
    return [];
  }

  function putMovieWatched(id) {
    let moviesW = getMovieWatched();
    let pushMoviesW = false;
    const index = moviesW.indexOf(id);

    if (index === -1) {
      moviesW.push(id);
      pushMoviesW = true;
    } else {
      moviesW.splice(index, 1);
    }

    localStorage.setItem(keyW, JSON.stringify(moviesW));

    return { pushMoviesW, moviesW };
  }

  function putMovieQueue(id) {
    let moviesQ = getMovieQueue();
    let pushMoviesQ = false;
    const index = moviesQ.indexOf(id);

    if (index === -1) {
      moviesQ.push(id);
      pushMoviesQ = true;
    } else {
      moviesQ.splice(index, 1);
    }

    localStorage.setItem(keyQ, JSON.stringify(moviesQ));

    return { pushMoviesQ, moviesQ };
  }
}
