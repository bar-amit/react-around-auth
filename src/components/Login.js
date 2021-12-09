import UserForm from "./UserForm";

export default function Login({ handleLogin }) {
  function handleSubmit(e) {
    e.preventDefault();

    handleLogin();
  }

  return (
    <UserForm
      handleFormSubmit={handleSubmit}
      formTitle="Sign in"
      formName="signin"
      linkText="Not a member yet? Sign up here!"
    />
  );
}
