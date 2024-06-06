const cohortId = 'wff-cohort-14';
const urlUser = `https://nomoreparties.co/v1/${cohortId}/users/me`;
const urlCard = `https://nomoreparties.co/v1/${cohortId}/cards`; 
const headers = {
  authorization: '6f573362-5f06-4f70-8bea-df09e2f16ca1',
  'Content-Type': 'application/json'
};

export function getUserProfile() {
  return fetch(urlUser, { headers })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    });
}

export function getInitialCards() {
  return fetch(urlCard, { headers })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    });
}

export function updateProfile(name, about) {
  return fetch(urlUser, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ name, about })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    });
}

export function addCard(name, link) {
  return fetch(urlCard, {
    method: 'POST',
    headers,
    body: JSON.stringify({ name, link })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    });
}

export function deleteCard(cardId) {
  return fetch(`${urlCard}/${cardId}`, {
    method: 'DELETE',
    headers
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    });
}

export function updateAvatar(avatar) {
  return fetch(`${urlUser}/avatar`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({ avatar })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      return res.json();
    });
}

export function toggleLike(cardId, isLiked) {
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