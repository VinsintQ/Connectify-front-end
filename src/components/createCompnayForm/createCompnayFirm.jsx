// SignupForm.jsx
import authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import companyService from "../../services/companyService";

const createCompany = (props) => {
  const navigate = useNavigate();
  // const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    companiSize: "",
    about: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.name.trim() !== "" &&
        formData.industry.trim() !== ""
      ) {
        const newCompanyResponse = await companyService.create(formData);
        props.setUser(newUserResponse.user);
        navigate("/");
      } else {
        console.log("Please fill all the fields");
      }
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { name, industry,} =
    formData;

  // const isFormInvalid = () => {
  //   return !(username && password && password === passwordConf);
  // };

  return (
    <main>
      <h1>create company</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            required
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="industry"> industry:</label>
          <input
            type="text"
            id="industry"
            value={industry}
            name="industry"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>create</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
