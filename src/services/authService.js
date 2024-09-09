const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//some thing
const signout = () => {
  window.localStorage.removeItem("token");
};

const getUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const rawPayload = token.split(".")[1];
    const jsonPayload = window.atob(rawPayload);

    const user = JSON.parse(jsonPayload);
    return user;
  } catch (err) {
    return null;
  }
};

const signup = async (formData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    if (json.token) {
      localStorage.setItem("token", json.token);
    }
    const user = parseToken(json.token);
    return { user };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const parseToken = (token) => {
  if (!token) return null;

  try {
    const rawPayload = token.split(".")[1];
    const jsonPayload = window.atob(rawPayload);

    const payload = JSON.parse(jsonPayload);
    return payload;
  } catch (error) {
    return null;
  }
};

const signin = async (user) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const json = await res.json();

    if (json.error) {
      throw new Error(json.error);
    }

    if (json.token) {
      // save it to local storage
      window.localStorage.setItem("token", json.token);

      const rawPayload = json.token.split(".")[1];
      const jsonPayload = window.atob(rawPayload);

      const user = JSON.parse(jsonPayload);
      return user;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  signup,
  signin,
  getUser,
  signout,
};
