const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/company/Jobs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

const apply = async (jobId, formData) => {
  try {
    const res = await fetch(`${BASE_URL}/company/jobs/${jobId}/app`, {
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

const viewapp = async (jobId, compId) => {
  try {
    const res = await fetch(`${BASE_URL}/company/${compId}/jobs/${jobId}/app`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default { index, apply, viewapp };
