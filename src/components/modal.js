
export function openModal(evt) {
  evt.classList.add('popup_is-animated');
  setTimeout(() => {
    evt.classList.add('popup_is-opened');
  }, 1);
  document.addEventListener('keydown', closeModalOnEsc);
}

export function closeModal(evt) {
  evt.removeAttribute('style');
  setTimeout(() => {
    evt.classList.remove('popup_is-opened');
  }, 1);
  document.removeEventListener('keydown', closeModalOnEsc);
}

export function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    if (openPopup) {
      closeModal(openPopup);
    }
  }
}

export function closeModalByOverlay(event) {
  if (event.target.classList.contains('popup')) { 
  closeModal(event.target); 
}
}