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

const addService = async (userId, serviceData) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(serviceData),
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
export default { getAllServices, addService };
