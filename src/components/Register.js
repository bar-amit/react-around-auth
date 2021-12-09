import UserForm from "./UserForm";

export default function Register({ handleRegistration }) {
  function handleSubmit(e) {
    e.preventDefault();

    handleRegistration();
  }

  return (
    <UserForm
      handleFormSubmit={handleSubmit}
      formTitle="Sign up"
      formName="register"
      linkText="Already a member? Log in here!"
    />
  );
}
