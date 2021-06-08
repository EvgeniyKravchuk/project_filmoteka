const refs = {
  switch: document.querySelector('#switch'),
  fullpage: document.querySelector('#fullpage'),
};

refs.switch.addEventListener('click', onSwitchClick);

function onSwitchClick() {
  refs.fullpage.classList.toggle('night');
  refs.switch.classList.toggle('switched');
}
