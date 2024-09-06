const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;
const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async (username, userId) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, userId }),
  };
  const res = await fetch(`${BASE_URL}/add-follower`, options);

  return res.json();
};

const AddFriend = async (username, userId) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, userId }),
  };
  const res = await fetch(`${BASE_URL}/add-friend`, options);

  return res.json();
};

const show = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default {
  index,
  create,
  show,
  AddFriend,
};
