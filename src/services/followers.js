const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/follower`;

const index = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const AddFollower = async (username, userId) => {
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

const DeleteFollower = async (userId, followerId) => {
  const options = {
    method: "Delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `${BASE_URL}/${userId}/follower/${followerId}`,
    options
  );

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
  AddFollower,
  show,
  DeleteFollower,
};
