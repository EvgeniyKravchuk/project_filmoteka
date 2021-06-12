const refs = {
  body: document.querySelector('body'),
  openTeamModal: document.querySelector('.team_link'),
  teamModal: document.querySelector('.js-team-modal'),
  backdropTeamModal: document.querySelector('.team-backdrop'),
};
console.log(refs.openTeamModal);
console.log(refs.body);
console.log(refs.teamModal);
console.log(refs.backdropTeamModal);

refs.openTeamModal.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', escKey);
  refs.backdropTeamModal.addEventListener('click', backdropClick);
  refs.body.classList.add('modal-team-open');
  refs.teamModal.classList.remove('is-hiddden');
}

function closeTeamModal() {
  window.removeEventListener('keydown', escKey);
  refs.body.classList.remove('modal-team-open');
  refs.teamModal.classList.add('is-hiddden');
  refs.backdropTeamModal.removeEventListener('click', backdropClick);
}

function backdropClick(e) {
  if (e.currentTarget === e.target) {
    closeTeamModal();
  }
}

function escKey(e) {
  if (e.code === 'Escape') {
    closeTeamModal();
  }
}