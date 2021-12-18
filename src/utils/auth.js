const { authBaseUrl = "https://register.nomoreparties.co" } = process.env;

function checkToken({ token }) {
  return fetch(`${authBaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then(({ data }) => {
      if (data) return data;
      else {
        console.log("?");
        const err = new Error("Server error: recieved empty data");
        err.statusCode = 500;
        throw err;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function checkLocalStorageToken() {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const { _id: id, email } = await checkToken({ token });
      auth.user.email = email;
      auth.isSignedIn = true;
    } catch (err) {
      console.log(err);
    }
  }
}

function saveToken({ token }) {
  localStorage.setItem("jwt", token);
}

function removeToken() {
  localStorage.removeItem("jwt");
}

async function signup({ password, email }) {
  try {
    const res = await fetch(`${authBaseUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}

async function signin({ email, password }) {
  try {
    const { token } = await fetch(`${authBaseUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email }),
    }).then((response) => response.json());
    if (token) {
      saveToken({ token });
      auth.user.email = email;
      auth.isSignedIn = true;
      return Promise.resolve();
    }
    const err = new Error("failed login");
    throw err;
  } catch (err) {
    return Promise.reject("failed login");
  }
}

function logout() {
  removeToken();
  auth.isSignedIn = false;
  auth.user = { email: null, id: null };
}

const auth = {
  isSignedIn: false,
  user: { email: null, id: null },
  logout,
  signup,
  signin,
  initialize() {
    return checkLocalStorageToken();
  },
};

export { auth };
