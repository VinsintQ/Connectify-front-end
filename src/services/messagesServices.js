const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/message`;

const showMassages = async (conversationId) => {
  try {
    const res = await fetch(`${BASE_URL}/${conversationId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async (messageobj) => {
  const conversationId = messageobj.conversationId;
  const sender = messageobj.sender;
  const text = messageobj.text;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ conversationId, sender, text }),
  };
  const res = await fetch(`${BASE_URL}`, options);

  return res.json();
};

const DeleteMasseges = async (massegesId) => {
  const options = {
    method: "Delete",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${BASE_URL}/${massegesId}`, options);

  return res.json();
};

const UpdateMasseges = async (massegesId) => {
  const options = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${BASE_URL}/${massegesId}`, options);

  return res.json();
};

export default {
  showMassages,
  create,
  DeleteMasseges,
};
