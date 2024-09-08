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

const create = async (senderId, receiverId) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ senderId, receiverId }),
  };
  const res = await fetch(`${BASE_URL}`, options);

  return res.json();
};

const Delete = async (conversationId) => {
  const options = {
    method: "Delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${BASE_URL}/${conversationId}`, options);

  return res.json();
};

export default {
  index,
  create,
  Delete,
};
