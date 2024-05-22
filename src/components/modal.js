
export function closeModal(evt) {
  evt.removeAttribute('style');
  setTimeout(() => {
    evt.classList.remove('popup_is-opened');
  }, 1);
}

export function openModal(evt) {
  evt.classList.add('popup_is-animated');
  setTimeout(() => {
    evt.classList.add('popup_is-opened');
  }, 1);
  evt.style.pointerEvents = 'auto';
  evt.style.userSelect = 'auto';
}