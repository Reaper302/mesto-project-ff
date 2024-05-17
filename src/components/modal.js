const modal = document.querySelector('.popup_type_edit');
const addPopUp = document.querySelector('.popup_type_new-card');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameContainer = document.querySelector(".profile__title");
const jobContainer = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup_type_image');
export { modal, addPopUp, nameInput, jobInput, nameContainer, jobContainer };

export function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    smoothClosingEdit();
    smoothClosingAdd();
    smoothClosingImage();
  };
};

export function closeModalOnClick(event) {
  if (event.target === modal) {
    smoothClosingEdit();
  } else if (event.target === addPopUp) {
    smoothClosingAdd();
  }
  else if (event.target === popupImage) {
    smoothClosingImage();
  };
};


export function smoothClosingEdit() {
  modal.removeAttribute('style');
  setTimeout(() => {
    modal.classList.remove('popup_is-animated');
  }, 200);
};

export function smoothClosingAdd() {
  addPopUp.removeAttribute('style');
  setTimeout(() => {
    addPopUp.classList.remove('popup_is-animated');
  }, 200);
};

export function smoothClosingImage() {
  popupImage.removeAttribute('style');
  setTimeout(() => {
    popupImage.classList.remove('popup_is-animated');
  }, 200);
};

export function smoothOpeningEdit() {
  modal.classList.add('popup_is-animated');
  modal.style.visibility = 'visible';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 1);
  modal.style.pointerEvents = 'auto';
  modal.style.userSelect = 'auto';
  nameInput.value = nameContainer.textContent;
  jobInput.value = jobContainer.textContent;
};

export function smoothOpeningAdd() {
  addPopUp.classList.add('popup_is-animated');
  addPopUp.style.visibility = 'visible';
  setTimeout(() => {
    addPopUp.style.opacity = '1';
  }, 1);
  addPopUp.style.pointerEvents = 'auto';
  addPopUp.style.userSelect = 'auto';
};
