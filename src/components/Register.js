import UserForm from "./UserForm";

export default function Register({ handleRegistration }) {
  return (
    <UserForm
      handleFormSubmit={handleRegistration}
      formTitle="Sign up"
      formName="register"
      linkText="Already a member? Log in here!"
    />
  );
}
