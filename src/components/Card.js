import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

/**
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
 *
 * Card Props type defenition:
 * @typedef {Object} CardProps - props for Card
 * @property {cardData} data - Card data
 * @property {Function} onCardClick - Opens image popup on click.
 * @property {Function} onCardLike - Handles like button click.
 * @property {Function} onCardDelete - Handles card delete
 */
/**
 * Card JSX component
 * @param {CardProps} props - props object
 */

function Card({ data, onCardClick, onCardLike, onCardDelete }) {
  const { _id: id } = useContext(CurrentUserContext);

  const isOwn = id === data.owner._id;
  const isLiked = data.likes.some((like) => like._id === id);

  return (
    <li className="card">
      {isOwn ? (
        <button
          className="card__delete-button"
          type="button"
          aria-label="delete"
          onClick={() => onCardDelete(data)}
        ></button>
      ) : (
        ""
      )}
      <img
        className="card__image"
        src={data.link}
        alt={data.name}
        onClick={() => onCardClick(data)}
      />
      <div className="card__panel">
        <h2 className="card__title">{data.name}</h2>
        <div className="card__like">
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            type="button"
            aria-label="Like"
            onClick={() => onCardLike(data)}
          />
          <p className="card__like-counter">{data.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
