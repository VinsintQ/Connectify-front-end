// SignupForm.jsx
import * as authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    passwordConf: "",
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
        formData.username.trim() !== "" &&
        formData.password.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== ""
      ) {
        const newUserResponse = await authService.Signup(formData);
        props.setUser(newUserResponse.user);
        navigate("/");
      } else {
        console.log("Please fill all the fields");
      }
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf, name, phone, email } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            id="name"
            value={username}
            name="username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            id="name"
            value={name}
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email"> email:</label>
          <input
            type="text"
            id="email"
            value={email}
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone"> phone:</label>
          <input
            type="number"
            id="phone"
            value={phone}
            name="phone"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type="password"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default SignupForm;
