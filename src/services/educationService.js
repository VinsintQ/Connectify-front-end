const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  // Decode the token to extract the payload (which includes the user ID)
  const payload = JSON.parse(atob(token.split(".")[1]));

  // Assuming the user ID is stored in the `id` field in the payload
  return payload._id;
};

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const show = async (userId) => {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/education`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default { show };
