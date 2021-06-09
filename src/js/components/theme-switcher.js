const themeSwitcherToggleRef = document.querySelector('.toggle-input');
const mainRef = document.querySelector('.js_container');
const initialState = localStorage.getItem('toggleState') === 'true';

themeSwitcherToggleRef.checked = initialState;

themeSwitcherToggleRef.addEventListener('change', switchTheme);

function switchTheme(e) {
  mainRef.classList.toggle('night');
  localStorage.setItem('toggleState', themeSwitcherToggleRef.checked);
}
