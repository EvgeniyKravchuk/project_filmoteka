const refs = {
  body: document.querySelector('body'),
  openTeamModal: document.querySelector('.team_link'),
  teamModal: document.querySelector('.js-team-modal'),
  backdropTeamModal: document.querySelector('.team-backdrop'),
  closeTeamlBtn: document.querySelector('.modal-team-close'),
};

refs.openTeamModal.addEventListener('click', openModal);

function openModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', escKey);
  refs.backdropTeamModal.addEventListener('click', backdropClick);
  refs.closeTeamlBtn.addEventListener('click', closeTeamModal);
  refs.body.classList.add('modal-team-open');
  refs.teamModal.classList.remove('is-hiddden');
}

function closeTeamModal() {
  window.removeEventListener('keydown', escKey);
  refs.body.classList.remove('modal-team-open');
  refs.teamModal.classList.add('is-hiddden');
  refs.backdropTeamModal.removeEventListener('click', backdropClick);
  refs.closeTeamlBtn.removeEventListener('click', closeTeamModal);
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