const themeSwitcherToggleRef = document.querySelector('.toggle-input');
const bodyRef = document.querySelector('.js-body');

localStorageDataGet();

themeSwitcherToggleRef.addEventListener('change', switchTheme);

function switchTheme(e) {
  switchThemeOnBackground();

  localStorageDataSet();
}

function switchThemeOnBackground() {
  bodyRef.classList.toggle('night');
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
