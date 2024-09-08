const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const index = async ({ user }) => {
  try {
    const userId = user._id;
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/experience`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const add = async ({ formData, user }) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const res = await fetch(`${BASE_URL}/${user._id}/experience`, options);

  return res.json();
};

const show = async ({ user, expId }) => {
  try {
    const res = await fetch(`${BASE_URL}/${user._id}/experience/${expId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

async function update({ expId, formData, user }) {
  try {
    const res = await fetch(`${BASE_URL}/${user._id}/experience/${expId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
export default { index, add, show, update };
