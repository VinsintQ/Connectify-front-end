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

const show = async (userId) => {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const AddFollower = async (username, userId, image) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, userId, image }),
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

export default {
  index,
  AddFollower,
  show,
  DeleteFollower,
};
