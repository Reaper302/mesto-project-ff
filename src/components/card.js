export function createCard(cardData, deleteCallback, likeCallback, openCallback) {
  const cardTemplate = document.getElementById('card-template');
  const cardClone = cardTemplate.content.cloneNode(true);
  const likeButton = cardClone.querySelector('.card__like-button');
  const delButton = cardClone.querySelector('.card__delete-button');
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener('click', openCallback);
  delButton.addEventListener('click', deleteCallback);
  likeButton.addEventListener('click', likeCallback);

  return cardClone;
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
