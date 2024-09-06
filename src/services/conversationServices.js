const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/conversation`;

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

export default {
  index,
  create,
};
