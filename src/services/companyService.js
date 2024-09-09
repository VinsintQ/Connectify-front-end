const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/company`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const owned = async (userId) => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    let ownedCompanies = await res.json();

    return ownedCompanies.filter((company) => company.owner === userId);
    // return res.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async ({ formData }) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const res = await fetch(`${BASE_URL}`, options);

  return res.json();
};

const show = async (companyId) => {
  try {
    const res = await fetch(`${BASE_URL}/${companyId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default {
  index,
  create,
  show,
  owned,
};
