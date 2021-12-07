import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

/**
 * @typedef {Object} AddPlaceProps
 * @property {string} title - Form title
 * @property {string} name - Form name
 * @property {string} buttonText - Button text
 * @property {boolean} isOpen - Is the popup open
 * @property {Function} onClose - Function to close the popup
 * @property {Function} onSubmit - Function to handle the form data
 */

/**
 *
 * @param {AddPlaceProps} props - JSX props
 * @returns
 */
function AddPlacePopup({
  title,
  name: formName,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChange(e) {
    if (e.target.name === "title") setName(e.target.value);
    else setLink(e.target.value);
  }

  function handleNewPlaceSubmit() {
    return onSubmit({ name, link });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={title}
      name={formName}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleNewPlaceSubmit}
    >
      <label className="form__field">
        <input
          id="input_title"
          className="form__input form__input_type_title"
          value={name}
          type="text"
          name="title"
          placeholder="Title"
          minLength="1"
          maxLength="30"
          required
          onChange={handleChange}
        />
        <span id="input_title-error" className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          id="input_link"
          className="form__input form__input_type_link"
          value={link}
          type="url"
          name="link"
          placeholder="Image link"
          required
          onChange={handleChange}
        />
        <span id="input_link-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
