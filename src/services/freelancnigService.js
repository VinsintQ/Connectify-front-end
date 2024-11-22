const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const getAllServices = async (userid) => {
  try {
    const res = await fetch(`${BASE_URL}/${userid}/services`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const addService = async ({ userId, formData }) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/service`, {
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

const getmyServices = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/Myservice`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
export default { getAllServices, addService, getmyServices };
