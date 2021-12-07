import React from "react";
import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import avatarImage from "../images/profile__image.jpg";

/**
 * cardData type defenition:
 * @typedef {Object} cardData
 * @property {string} _id - Card ID.
 * @property {string} createdAt - Time of creation.
 * @property {Array<string>} likes - An array of IDs of users whom liked the card.
 * @property {string} link - Link to card image.
 * @property {string} name - Card title.
 * @property {userData} owner - User data of card's owner.
 */

/**
 * Main section component.
 * @param {{onEditProfileClick: Function, onAddPlaceClick: Function, onEditAvatarClick: Function, onCardClick: Function, onCardLike: Function, onCardDelete: Function cardsList: Array<cardData>}} props - Props object.
 * @returns {JSX.Element} Main JSX component.
 */
function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cardsList,
}) {
  const { name, avatar, about } = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__avatar"
          type="button"
          onClick={onEditAvatarClick}
        >
          <img
            className="profile__image"
            src={avatar ? avatar : avatarImage}
            alt="profile"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{name ? name : "Please be patient"}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Edit profile"
            onClick={onEditProfileClick}
          />
          <p className="profile__bio">
            {about ? about : "We are fetching your user info..."}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Add an item"
          onClick={onAddPlaceClick}
        />
      </section>
      <section className="gallery">
        <ul className="gallery__container">
          {cardsList.map((card) => (
            <Card
              data={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
