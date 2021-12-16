import { useState } from "react";
import { Link } from "react-router-dom";

function UserForm({ handleFormSubmit, formTitle, formName, linkText }) {
  const [currentButtonText, setCurrentButtonText] = useState(formTitle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputChange(e) {
    const inputName = e.target.name;
    if (inputName === "email") setEmail(e.target.value);
    else setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setCurrentButtonText("Sending...");
    handleFormSubmit({ email, password });
  }

  return (
    <main className="main user-form">
      <h2 className="user-form__title">{formTitle}</h2>
      <form
        className={`form form_name_${formName}`}
        name={formName}
        onSubmit={handleSubmit}
      >
        <label className="form__field">
          <input
            id="input_email"
            className="form__input form__input_type_email"
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            required
            onChange={handleInputChange}
          />
          <span id="input_password-error" className="form__input-error"></span>
        </label>
        <label className="form__field">
          <input
            id="input_password"
            className="form__input form__input_type_password"
            value={password}
            type="text"
            name="password"
            placeholder="Password"
            minLength="2"
            maxLength="200"
            required
            onChange={handleInputChange}
          />
          <span id="input_password-error" className="form__input-error"></span>
        </label>
        <button className="form__save-button" type="submit">
          {currentButtonText}
        </button>
        <Link
          to={formName === "signin" ? "/register" : "/login"}
          className="user-form__link"
        >
          {linkText}
        </Link>
      </form>
    </main>
  );
}

export default UserForm;
