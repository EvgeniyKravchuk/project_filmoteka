const themeSwitcherToggleRef = document.querySelector('.toggle-input');
const bodyRef = document.querySelector('.js-body');
const footerRef = document.querySelector('.footer');

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
  bodyRef.classList.toggle('night');
  footerRef.classList.toggle('night');
  footerRef.classList.toggle('day');
}

function localStorageDataSet() {
  localStorage.setItem('toggleState', themeSwitcherToggleRef.checked);
}

function localStorageDataGet() {
  const initialState = localStorage.getItem('toggleState') === 'true';

  themeSwitcherToggleRef.checked = initialState;

  if (initialState) {
    switchThemeOnBackground();
  }
}
