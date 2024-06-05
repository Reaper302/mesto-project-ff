import '../index.css';
import { createCard } from "./card.js";
import { openModal, closeModal, closeModalByOverlay } from './modal.js';
import { enableValidation, clearValidation } from './validation';
import { getUserProfile, getInitialCards, updateProfile, addCard, updateAvatar, deleteCard } from './api.js';

const editPopUp = document.querySelector('.popup_type_edit');
const addPopUp = document.querySelector('.popup_type_new-card');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const nameContainer = document.querySelector(".profile__title");
const jobContainer = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const addCardForm = addPopUp.querySelector('.popup__form');
const editForm = editPopUp.querySelector('.popup__form');
const confirmPopup = document.querySelector('.popup_type_confirm');
const avatarEditButton = document.querySelector('.profile__image');
const avatarEditPopup = document.querySelector('.popup_type_avatar-edit');
const avatarEditForm = avatarEditPopup.querySelector('.popup__form[name="avatar-edit"]');
const avatarInput = avatarEditForm.querySelector('.popup__input_type_avatar-link');
let currentCardId;
let userId;

avatarEditButton.addEventListener('click', function() {
  clearValidation(avatarEditForm, validationConfig);
  openModal(avatarEditPopup);
});

avatarEditForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  
  const avatarLink = avatarInput.value;
  const submitButton = avatarEditForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateAvatar(avatarLink)
    .then(data => {
      document.querySelector('.profile__image').style.backgroundImage = `url(${data.avatar})`;
      closeModal(avatarEditPopup);
      clearValidation(avatarEditForm, validationConfig);
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
});

function openCallback(event) {
  openModal(popupImage);
  popupImageContent.src = event.currentTarget.src;
  popupImageContent.alt = event.currentTarget.alt;
  popupImageText.textContent = event.currentTarget.alt;
}

function openConfirmPopup(cardId) {
  openModal(confirmPopup);
  currentCardId = cardId;
}

confirmPopup.querySelector('.popup__form').addEventListener('submit', function (evt) {
  evt.preventDefault();
  deleteCard(currentCardId)
    .then(() => {
      updateCardsCallback();
      closeModal(confirmPopup);
    })
    .catch(err => console.error('Error:', err));
});

function updateCardsCallback() {
  placesList.innerHTML = '';
  getInitialCards()
    .then(cardsData => {
      cardsData.forEach((cardData) => {
        const newCardElement = createCard(cardData, userId, openCallback, openConfirmPopup);
        placesList.appendChild(newCardElement);
      });
    })
    .catch(err => console.error('Error:', err));
}

function addCallback(evt) {
  evt.preventDefault();
  const name = addCardForm.querySelector('.popup__input_type_card-name').value;
  const url = addCardForm.querySelector('.popup__input_type_url').value;

  const submitButton = addCardForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  addCard(name, url)
    .then(cardData => {
      const newCardElement = createCard(cardData, userId, openCallback, openConfirmPopup);
      placesList.prepend(newCardElement);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(addPopUp);
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
}

addCardForm.addEventListener('submit', addCallback);

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpsClose = document.querySelectorAll('.popup__close');

addButton.addEventListener('click', function() {
  clearValidation(addCardForm, validationConfig);
  openModal(addPopUp);
});

editButton.addEventListener('click', function() {
  clearValidation(editForm, validationConfig);
  openModal(editPopUp);
  nameInput.value = nameContainer.textContent;
  jobInput.value = jobContainer.textContent;
});

document.addEventListener('click', closeModalByOverlay);

popUpsClose.forEach(function(button) {
  button.addEventListener('click', function() {
    closeModal(button.closest('.popup'));
  });
});

function interactionForm(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  const submitButton = editForm.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateProfile(name, job)
    .then(data => {
      nameContainer.textContent = data.name;
      jobContainer.textContent = data.about;
      closeModal(editPopUp);
      clearValidation(editForm, validationConfig);
    })
    .catch(error => console.error('Error:', error))
    .finally(() => {
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
    });
}

editForm.addEventListener('submit', interactionForm);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

Promise.all([getUserProfile(), getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    nameContainer.textContent = userData.name;
    jobContainer.textContent = userData.about;
    document.querySelector('.profile__image').style.backgroundImage = `url(${userData.avatar})`;
    cardsData.forEach((cardData) => {
      const newCardElement = createCard(cardData, userId, openCallback, openConfirmPopup);
      placesList.appendChild(newCardElement);
    });
  })
  .catch(err => console.error('Error:', err));
