const cohortId = 'wff-cohort-14';

export function createCard(cardData, userId, openCallback, openConfirmPopup) {
  const cardTemplate = document.getElementById('card-template');
  const cardClone = cardTemplate.content.cloneNode(true);
  const likeButton = cardClone.querySelector('.card__like-button');
  const delButton = cardClone.querySelector('.card__delete-button');
  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const likeContainer = cardClone.querySelector('.like-container');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeContainer.textContent = cardData.likes.length;

  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    delButton.remove();
  }

  cardImage.addEventListener('click', openCallback);
  if (delButton) {
    delButton.addEventListener('click', (event) => {
      event.preventDefault();
      openConfirmPopup(cardData._id);
    });
  }
  likeButton.addEventListener('click', (event) => {
    handleLikeButtonClick(event, cardData._id, likeContainer, likeButton);
  });

  return cardClone;
}

function handleLikeButtonClick(event, cardId, likeContainer, likeButton) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  toggleLike(cardId, !isLiked)
    .then(updatedCard => {
      likeContainer.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(error => console.error('Error:', error));
}

function toggleLike(cardId, isLiked) {
  const method = isLiked ? 'PUT' : 'DELETE';
  return fetch(`https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`, {
    method: method,
    headers: {
      authorization: '6f573362-5f06-4f70-8bea-df09e2f16ca1'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Error: ' + res.statusText);
      }
      return res.json();
    });
}

export function deleteCard(cardId, updateCardsCallback) {
  fetch(`https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: '6f573362-5f06-4f70-8bea-df09e2f16ca1'
    }
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Error: ' + res.statusText);
    }
    return res.json();
  })
  .then(() => {
    updateCardsCallback();
  })
  .catch(error => console.error('Error:', error));
}
