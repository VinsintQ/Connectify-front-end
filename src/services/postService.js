const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Decode the token to extract the payload (which includes the user ID)
  const payload = JSON.parse(atob(token.split(".")[1]));

  // Assuming the user ID is stored in the `id` field in the payload
  return payload._id;
};

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const allposts = async (userId) => {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/allposts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};


const indexc = async (userId,postId) => {
  try {
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/post/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const add = async ({ formData, userId }) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const deleter = async (userId,postId) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await fetch(
    `${BASE_URL}/${userId}/post/${postId}`,
    options
  );

  return res.json();
};

const update = async ({ postId, formData, userId }) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};
export default {
  allposts,
  add,
  update,indexc,deleter
};
