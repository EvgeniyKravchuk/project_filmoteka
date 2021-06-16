const refs = {
  watchedBtn: document.querySelector('.js_btn_w'),
  queueBtn: document.querySelector('.js_btn_q'),
};

refs.watchedBtn.addEventListener('click', sortFilmsForWatched);
refs.queueBtn.addEventListener('click', sortFilmsForQueue);

function sortFilmsForWatched(evt) {
  if (evt.currentTarget.classList.contains('current_btn')) {
    return;
  } else if (refs.queueBtn.classList.contains('current_btn')) {
    refs.queueBtn.classList.remove('current_btn');
    switchCurrentBtn(evt);
  }
}

function sortFilmsForQueue(evt) {
  if (evt.currentTarget.classList.contains('current_btn')) {
    return;
  } else {
    switchCurrentBtn(evt);
    refs.watchedBtn.classList.remove('current_btn');
  }
}

function switchCurrentBtn(evt) {
  if (
    (evt.currentTarget === refs.watchedBtn && !refs.watchedBtn.classList.contains('current_btn')) ||
    (evt.currentTarget === refs.queueBtn && !refs.queueBtn.classList.contains('current_btn'))
  ) {
    evt.currentTarget.classList.add('current_btn');
  } else {
    evt.currentTarget.classList.remove('current_btn');
  }
}
