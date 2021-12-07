import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

/**
 * @typedef {Object} EditAvatarProps
 * @property {string} title - Form title
 * @property {string} name - Form name
 * @property {string} buttonText - Button text
 * @property {boolean} isOpen - Is the popup open
 * @property {Function} onClose - Function to close the popup
 * @property {Function} onSubmit - Function to handle the form data
 */

/**
 *
 * @param {EditAvatarProps} props - JSX props.
 * @returns
 */
function EditAvatarPopup({
  title,
  name: formName,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) {
  const inputRef = useRef();

  function handleEditAvatarSubmit() {
    return onSubmit(inputRef.current.value);
  }

  return (
    <PopupWithForm
      title={title}
      name={formName}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditAvatarSubmit}
    >
      <label className="form__field">
        <input
          id="input_url"
          className="form__input form__input_type_url"
          ref={inputRef}
          type="url"
          name="url"
          placeholder="Image URL"
          required
        />
        <span id="input_url-error" className="form__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
