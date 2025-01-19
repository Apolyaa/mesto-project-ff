const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
      authorization: '3e66b947-6a2e-48d1-8067-8003dd02960b',
      'Content-Type': 'application/json'
    }
  }
  
  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

export const getProfile = () =>{
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

export const updateProfile = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
        })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

export const addCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
        })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
        })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
        })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};
export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
        })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};
export const updateAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        })
        })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
              // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
};