import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

/**
 * @typedef {Object} EditProfileProps
 * @property {string} title - Form title
 * @property {string} name - Form name
 * @property {string} buttonText - Button text
 * @property {boolean} isOpen - Is the popup open
 * @property {Function} onClose - Function to close the popup
 * @property {Function} onSubmit - Function to handle the form data
 */

/**
 *
 * @param {EditProfileProps} props - JSX props.
 * @returns
 */
function EditProfilePopup({
  title,
  name: formName,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  const { name: currentName, about: currentAbout } =
    useContext(CurrentUserContext);

  const [name, setName] = useState(currentName);
  const [about, setAbout] = useState(currentAbout);

  function handleInputChange(e) {
    if (e.target.name === "name") setName(e.target.value);
    else setAbout(e.target.value);
  }

  function handleEditProfileSubmit() {
    return onSubmit({ name, about });
  }

  useEffect(() => {
    setAbout(currentAbout);
    setName(currentName);
  }, [currentName, currentAbout, isOpen]);

  return (
    <PopupWithForm
      title={title}
      name={formName}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditProfileSubmit}
    >
      <label className="form__field">
        <input
          id="input_name"
          className="form__input form__input_type_name"
          value={name}
          type="text"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          required
          onChange={handleInputChange}
        />
        <span id="input_name-error" className="form__input-error"></span>
      </label>
      <label className="form__field">
        <input
          id="input_bio"
          className="form__input form__input_type_bio"
          value={about}
          type="text"
          name="bio"
          placeholder="About me"
          minLength="2"
          maxLength="200"
          required
          onChange={handleInputChange}
        />
        <span id="input_bio-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
