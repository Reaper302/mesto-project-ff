
export function createCard(addCards, deleteCallback, likeCallback, openCallback, addCallback) {
  const CardTemplate = document.getElementById('card-template');
  const cardClone = CardTemplate.content.cloneNode(true);
  const likeButton = cardClone.querySelector('.card__like-button');
  const delButton = cardClone.querySelector('.card__delete-button');
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');

  cardImage.src = addCards.link;
  cardImage.alt = addCards.name;
  cardTitle.textContent = addCards.name;

  cardImage.addEventListener('click', openCallback);
  delButton.addEventListener('click', deleteCallback);
  likeButton.addEventListener('click', likeCallback);
  addCardForm.addEventListener('submit', addCallback);
  
  return cardClone;
}

const placesList = document.querySelector('.places__list');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = document.querySelector('.popup__image');
const popupImageText = document.querySelector('.popup__caption');
export { placesList, addCardPopup, addCardForm, popupImage, popupImageContent, popupImageText };

export function addCallback(evt) {
  evt.preventDefault();
  const nameInput = addCardForm.querySelector('.popup__input_type_card-name');
  const urlInput = addCardForm.querySelector('.popup__input_type_url');
  const name = nameInput.value;
  const url = urlInput.value;

  const newCardData = {
    name: name,
    link: url
  };

  const newCardElement = createCard(newCardData, remove, likeCard, openCallback);
  placesList.prepend(newCardElement);
  addCardForm.reset();
}

export function openCallback(event) {
  smoothOpeningImage();
  popupImageContent.src = event.currentTarget.src;
  popupImageText.textContent = event.currentTarget.alt;
}

export function smoothOpeningImage() {
  popupImage.classList.add('popup_is-animated');
  popupImage.style.visibility = 'visible';
  setTimeout(() => {
    popupImage.style.opacity = '1';
  }, 1);
  popupImage.style.pointerEvents = 'auto';
  popupImage.style.userSelect = 'auto';
}

export function likeCard(event) {
  const likeButtonActive = event.currentTarget.closest('.card__like-button');
  if (likeButtonActive) {
    likeButtonActive.classList.toggle('card__like-button_is-active');
  }
}

export function remove(event) {
  event.target.closest('.places__item').remove();
}
