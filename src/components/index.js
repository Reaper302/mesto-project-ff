import '../index.css';
import { initialCards } from '../cards/cards.js';
const AddIcon = new URL('../images/add-icon.svg', import.meta.url);
const Avatar = new URL('../images/avatar.jpg', import.meta.url);
const CardCastle = new URL('../images/card_1.jpg', import.meta.url)
const CardDesert = new URL('../images/card_2.jpg', import.meta.url);
const CardMountains = new URL('../images/card_3.jpg', import.meta.url);
const Close = new URL('../images/close.svg', import.meta.url)
const DeleteIcon = new URL('../images/delete-icon.svg', import.meta.url);
const EditIcon = new URL('../images/edit-icon.svg', import.meta.url);
const LiceActive = new URL('../images/like-active.svg', import.meta.url)
const LikeInActive = new URL('../images/like-inactive.svg', import.meta.url);
const Logo = new URL('../images/logo.svg', import.meta.url);

import { placesList, addCardForm } from "./card.js";
import { modal, nameInput, jobInput, nameContainer, jobContainer } from './modal.js';

import { createCard } from "./card.js";
import { addCallback } from "./card.js";
import { likeCard } from "./card.js";
import { remove } from "./card.js";
import { openCallback } from "./card.js";
import { smoothOpeningEdit } from './modal.js';
import { smoothOpeningAdd } from './modal.js';

addCardForm.addEventListener('submit', closePopup);
function closePopup() {
  smoothClosingAdd();
};

initialCards.forEach((addCards) => {
  const cardElement = createCard(addCards, remove, likeCard, openCallback, addCallback);
  placesList.appendChild(cardElement);
});

const EditProfile = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpClose = document.querySelectorAll('.popup__close');

popUpClose.forEach(button => {
  button.addEventListener('click', function() {
    smoothClosingEdit();
    smoothClosingAdd();
    smoothClosingImage();
  });
});

import { closeModalOnEsc } from './modal.js';
import { closeModalOnClick } from './modal.js';
import { smoothClosingEdit } from './modal.js';
import { smoothClosingAdd } from './modal.js';
import { smoothClosingImage } from './modal.js';

const PageClose = document.querySelector('.page');
PageClose.addEventListener('keydown', closeModalOnEsc);
addButton.addEventListener('click', smoothOpeningAdd);
EditProfile.addEventListener('click', smoothOpeningEdit);

EditProfile.addEventListener('click', function() {
  modal.style.display = 'flex';
});
PageClose.addEventListener('click', closeModalOnClick);

const formElement = document.querySelector('.popup__form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  nameContainer.textContent = name;
  jobContainer.textContent = job;
    
  smoothClosingEdit();
  nameInput.value = "";
  jobInput.value = "";
};

formElement.addEventListener('submit', handleFormSubmit);
