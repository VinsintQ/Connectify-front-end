const BASE_URL = "https://freetestapi.com/api/v1/users";

const show = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    console.log("Data:", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};
show();
export { show };
