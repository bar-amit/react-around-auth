/**
 * Api utility for Around the USA app.
 *
 *
 * userData type defenition:
 * @typedef {Object} userData
 * @property {string} name - Username.
 * @property {string} about - User description.
 * @property {string} avatar - Link for user's avatar.
 * @property {string} cohort - User's cohort.
 * @property {string} _id - User ID.
 *
 * cardData type defenition:
 * @typedef {Object} cardData
 * @property {string} _id - Card ID.
 * @property {string} createdAt - Time of creation.
 * @property {Array<userData>} likes - An array of IDs of users whom liked the card.
 * @property {string} link - Link to card image.
 * @property {string} name - Card title.
 * @property {userData} owner - User data of card's owner.
 */

class Api {
  /**
   * Constructor function for the Api class.
   * @param {{host: string, authorization: string}} param0 - Options object with a base url and a token for the server.
   */
  constructor({ host, authorization }) {
    this._host = host;
    this._headers = { authorization };
    this.userId = undefined;
  }
  /**
   * A private method for handling a respones from server.
   * @private
   * @param {*} res
   * @returns {Promise<*>}
   */
  _handleResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`error: ${res.status}, ${res.statusText}`);
  }
  /**
   * Fetching user data from the server
   * @param {string} [id='me'] - Optional (default is own user)
   * @returns {Promise<userData>} - User data.
   */
  getUserInfo(id = "me") {
    return fetch(`${this._host}/users/${id}`, { headers: this._headers })
      .then(this._handleResponse)
      .then((data) => {
        this.userId = data._id;
        return data;
      });
  }
  /**
   * Setting a new avatar with a PATCH request to server.
   * @param {string} avatar - Image link.
   * @returns {Promise<userData>} - User data {name, about, avatar, cohort, _id}
   */
  updateUserAvatar(avatar) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse);
  }
  /**
   * Setting new user name and description.
   * @param {{name: string, about: string}} param0 - An object with username and description.
   * @returns {Promise<userData>} - User data {name, about, avatar, cohort, _id}
   */
  updateUser({ name, about }) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }
  /**
   * Fetching a list of cards from the server.
   * @returns {Promise<Array<cardData>>} - A promise for an array of card data.
   */
  getCards() {
    return fetch(`${this._host}/cards`, { headers: this._headers }).then(
      this._handleResponse
    );
  }
  /**
   * Adding a new card to the server.
   * @param {{name: string, link: string}} param0
   * @returns {Promise<cardData>} - Card data.
   */
  addCard({ name, link }) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }
  /**
   * Delete a card form the server.
   * @param {string} id - Card id.
   * @returns {Promise<undefined>}
   */
  deleteCard(id) {
    return fetch(`${this._host}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  /**
   * Add like to a card
   * @param {string} id - card id
   * @returns {Promise<cardData>} - Card data.
   */
  addLike(id) {
    return fetch(`${this._host}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }
  /**
   * Remove like from a card
   * @param {string} id - card id
   * @returns {Promise<cardData>} - Card data.
   */
  removeLike(id) {
    return fetch(`${this._host}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

const api = new Api({
  host: "https://around.nomoreparties.co/v1/group-12",
  authorization: "9dcb4203-ec5d-4132-a4af-e260b13cb4d2",
});

export default api;
