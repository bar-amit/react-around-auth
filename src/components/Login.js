import UserForm from "./UserForm";

function Login({ handleLogin }) {
  return (
    <>
      <UserForm
        handleFormSubmit={handleLogin}
        formTitle="Sign in"
        formName="signin"
        linkText="Not a member yet? Sign up here!"
      />
    </>
  );
}

export default Login;
