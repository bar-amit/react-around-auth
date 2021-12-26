const { authBaseUrl = "http://localhost:3000" } = process.env;

function handleResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`error: ${res.status}, ${res.statusText}`);
}

function checkToken({ token }) {
  return fetch(`${authBaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
}

async function signup({ password, email }) {
  return fetch(`${authBaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
}

/**
 * sign in
 * @param {{email: string, password: string}}} params
 * @returns Promise<{token: string}>
 */
async function signin({ email, password }) {
  return fetch(`${authBaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(handleResponse);
}

function logout() {
  removeToken();
  auth.isSignedIn = false;
  auth.user = { email: null, id: null };
}

const auth = {
  checkToken,
  logout,
  signup,
  signin,
};

export { auth };
