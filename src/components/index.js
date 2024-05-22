import '../index.css';
import { initialCards } from '../cards/cards.js';
import { createCard, likeCard, remove } from "./card.js";
import { openModal, closeModal } from './modal.js';

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
const popUpForm = document.querySelector('.popup__form');

function openCallback(event) {
  smoothOpeningImage();
  popupImageContent.src = event.currentTarget.src;
  popupImageContent.alt = event.currentTarget.alt;
  popupImageText.textContent = event.currentTarget.alt;
}

function smoothOpeningImage() {
  popupImage.classList.add('popup_is-animated');
  setTimeout(() => {
    popupImage.classList.add("popup_is-opened")
  }, 1);
  popupImage.style.pointerEvents = 'auto';
  popupImage.style.userSelect = 'auto';
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
  closeModal(addPopUp);
}

addCardForm.addEventListener('submit', addCallback);

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpsClose = document.querySelectorAll('.popup__close');

addButton.addEventListener('click', function() {
  openModal(addPopUp);
});

editButton.addEventListener('click', function() {
  openModal(editPopUp);
  nameInput.value = nameContainer.textContent;
  jobInput.value = jobContainer.textContent;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-animated');
    if (openPopup) {
      closeModal(openPopup);
    }
  }
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup')) {
    closeModal(event.target);
  }
});

popUpsClose.forEach(function(button) {
  button.addEventListener('click', function() {
    closeModal(button.closest('.popup'));
  });
});

function editForm(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const job = jobInput.value;

  nameContainer.textContent = name;
  jobContainer.textContent = job;

  closeModal(editPopUp);
  nameInput.value = "";
  jobInput.value = "";
}
popUpForm.addEventListener('submit', editForm);
