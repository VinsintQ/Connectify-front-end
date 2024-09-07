const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const show = async ({ user }) => {
  try {
    const userId = user._id;
    const res = await fetch(`${BASE_URL}/${userId}/project`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default { show };
