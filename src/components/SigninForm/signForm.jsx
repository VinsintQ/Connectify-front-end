import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import axios from "axios";
import "./signform.css";

const SignForm = (props) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");  // Track phone validation error
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    passwordConf: "",
    image:
      "https://res.cloudinary.com/dqqmgoftf/image/upload/v1725897781/u06hkxs8jf4waa1jn5t0.jpg",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate phone number (only 8 digits)
    if (name === "phone") {
      if (value.length > 8) {
        setPhoneError("Phone number cannot be more than 8 digits.");
      } else if (value.length < 8 && value.length > 0) {
        setPhoneError("Phone number must be exactly 8 digits.");
      } else {
        setPhoneError("");  // Clear error if phone is valid
      }

      if (value.length <= 8 && /^[0-9]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin({
        username: formData.username,
        password: formData.password,
      });
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      if (formData.password === formData.passwordConf) {
        const newUserResponse = await authService.signup(formData);
        props.setUser(newUserResponse.user);
        navigate("/");
      } else {
        console.log("Passwords do not match");
      }
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const toggleForm = () => {
    setIsActive(!isActive);
  };

  const uploadImage = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    setError("");

    const base64 = await convertBase64(files);
    setLoading(true);

    axios
      .post(`${BASE_URL}/upload`, { image: base64 })
      .then((res) => {
        setUrl(res.data.url);
        setFormData({ ...formData, image: res.data.url });
        setError("");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 413) {
          setError("The image is too large. Please upload a smaller file.");
        } else {
          setError("An error occurred during the upload. Please try again.");
        }
      });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="big">
      <div className={`container ${isActive ? "active" : ""}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmitSignUp}>
            <p>{error}</p>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {phoneError && <p className="error-message">{phoneError}</p>}
            <input
              className="spaced-out"
              type="text"
              placeholder="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConf"
              value={formData.passwordConf}
              onChange={handleChange}
            />
            <input type="file" name="image" onChange={uploadImage} />
            {loading === false ? (
              <button type="submit">Sign Up</button>
            ) : (
              <p>Loading...</p>
            )}
          </form>
        </div>
        <div className="form-container sign-in">
          <form autoComplete="off" onSubmit={handleSubmitSignIn}>
            <h1>Sign In</h1>
            <p>{message}</p>
            <input
              type="text"
              autoComplete="off"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password"
              autoComplete="off"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us, please login with your personal info
              </p>
              <button className="hidden" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>

              <button className="hidden" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignForm;
