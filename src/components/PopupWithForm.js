import React from "react";

/**
 * Popup with form component.
 * @param {{title: string, name: string, buttonText: string, isOpen: boolean, onClose: Function, onSubmit: Function, children: JSX.Element[]}} props - Props object.
 * @returns {JSX.Element} Popup With Form JSX component.
 */
function PopupWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
}) {
  const [currentButtonText, setCurrentButtonText] = React.useState(buttonText);

  function handleSubmit(e) {
    e.preventDefault();

    setCurrentButtonText("Saving...");
    onSubmit().then(() => setCurrentButtonText(buttonText));
  }

  const handleOverlayClose = (e) => {
    if (e.target.classList.contains("popup_visible")) onClose();
  };

  return (
    <div
      className={`popup popup_name_${name} ${isOpen ? "popup_visible" : ""}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_shrink"
          type="button"
          aria-label="close"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`form form_name_${name}`}
          name={name}
          onSubmit={handleSubmit}
        >
          {children}
          <button className="form__save-button" type="submit">
            {currentButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
