const themeSwitcherToggleRef = document.querySelector('.toggle-input');
const mainRef = document.querySelector('.js_container');

localStorageDataGet();

themeSwitcherToggleRef.addEventListener('change', switchTheme);

function switchTheme(e) {
  switchThemeOnTextContent();
  switchThemeOnBackground();

  localStorageDataSet();
}

function switchThemeOnTextContent() {
  const movieTitlesRef = document.querySelectorAll('.movie-title');

  movieTitlesRef.forEach(element => {
    element.classList.toggle('text-night');
  });
}

function switchThemeOnBackground() {
  mainRef.classList.toggle('night');
}

function localStorageDataSet() {
  localStorage.setItem('toggleState', themeSwitcherToggleRef.checked);
}

function localStorageDataGet() {
  const initialState = localStorage.getItem('toggleState') === 'true';

  themeSwitcherToggleRef.checked = initialState;
}
