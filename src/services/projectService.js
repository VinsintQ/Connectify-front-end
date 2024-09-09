const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const index = async ({ user }) => {
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

const indexc = async ( userId ) => {
  try {
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}/project`, {
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
  const res = await fetch(`${BASE_URL}/${user._id}/project`, options);

  return res.json();
};
const show = async ({ user, proId }) => {
  try {
    const res = await fetch(`${BASE_URL}/${user._id}/project/${proId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const update = async ({ formData, user, proId }) => {
  try {
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch(
      `${BASE_URL}/${user._id}/project/${proId}`,
      options
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};


const deleter = async ( projectId, userId ) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await fetch(`${BASE_URL}/${userId}/project/${projectId}`, options);

  return res.json();
}
export default { index, add, show, update ,deleter , indexc};
