import '../index.css';
import { initialCards } from '../cards/cards.js';
import { createCard, likeCard, remove } from "./card.js";
import { openModal, closeModal, closeModalByOverlay } from './modal.js';
import { enableValidation, clearValidation } from './validation';

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

function openCallback(event) {
  openModal(popupImage);
  popupImageContent.src = event.currentTarget.src;
  popupImageContent.alt = event.currentTarget.alt;
  popupImageText.textContent = event.currentTarget.alt;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, remove, likeCard, openCallback);
  placesList.appendChild(cardElement);
});

function addCallback(evt) {
  evt.preventDefault();
  const name = addCardForm.querySelector('.popup__input_type_card-name').value;
  const url = addCardForm.querySelector('.popup__input_type_url').value;

  const newCardData = {
    name: name,
    link: url
  };

  const newCardElement = createCard(newCardData, remove, likeCard, openCallback);
  placesList.prepend(newCardElement);
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  closeModal(addPopUp);
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

  nameContainer.textContent = name;
  jobContainer.textContent = job;

  closeModal(editPopUp);
  clearValidation(editForm, validationConfig);
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
