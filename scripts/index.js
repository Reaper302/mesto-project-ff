
const placesList = document.querySelector('.places__list');
function createCard(addCards, deleteCallback) {
  const template = document.getElementById('card-template');
  const cardClone = template.content.cloneNode(true);
  const delButton = cardClone.querySelector('.card__delete-button');
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');

  cardImage.src = addCards.link;
  cardImage.alt = addCards.name;
  cardTitle.textContent = addCards.name;

  delButton.addEventListener('click', deleteCallback)
  placesList.appendChild(cardClone)
  return cardClone;
}

function remove(dc) {
  dc.target.parentNode.remove()
}

initialCards.forEach((addCards) => {
  const cardElement = createCard(addCards, remove);
  placesList.appendChild(cardElement);
});

//initialCards

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
