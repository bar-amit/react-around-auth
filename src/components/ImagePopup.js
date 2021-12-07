/**
 * Popup with image component.
 * @param {{card: {_id: string, createdAt: string, likes: Array<string>, link: string, name: string, owner: {name: string, about: string, avatar: string, cohort: string, _id: string}, onClose: Function}}} props - Props object.
 * @returns {JSX.Element} Image Popup JSX component.
 */
function ImagePopup({ card, onClose }) {
  const handleOverlayClose = (e) => {
    if (e.target.classList.contains("popup_visible")) onClose();
  };

  return (
    <div
      className={`popup popup_name_picture ${card.link ? "popup_visible" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__picture-container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="close"
          onClick={onClose}
        />
        <img className="popup__picture" src={card.link} alt={card.name} />
        <h2 className="popup__picture-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
