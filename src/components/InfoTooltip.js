import React from "react";
import successIcon from "../images/info-tooltip__succeed.svg";
import failIcon from "../images/info-tooltip__fail.svg";

/**
 * Popup with form component.
 * @param {{title: string, name: string, buttonText: string, isOpen: boolean, onClose: Function, onSubmit: Function, children: JSX.Element[]}} props - Props object.
 * @returns {JSX.Element} Popup With Form JSX component.
 */
function InfoTooltip({ hasSucceed, isOpen, onClose }) {
  const handleOverlayClose = (e) => {
    if (e.target.classList.contains("popup_visible")) onClose();
  };

  const text = {
    success: "Success! You have now been registered.",
    fail: "Oops, something went wrong! Please try again.",
  };

  return (
    <div
      className={`popup popup_name_info-tooltip ${
        isOpen ? "popup_visible" : ""
      }`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_shrink"
          type="button"
          aria-label="close"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-icon"
          src={hasSucceed ? successIcon : failIcon}
          alt={hasSucceed ? "Operation succeed" : "Operation failed"}
        />
        <h2 className="popup__title popup__title_centered">
          {hasSucceed ? text.success : text.fail}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
