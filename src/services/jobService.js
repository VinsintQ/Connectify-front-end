const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/company`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/Jobs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const apply = async (jobId) => {
  try {
    const res = await fetch(`${BASE_URL}/Jobs/${jobId}/apply`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
export default { index };
