import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import axios from "axios";
import "./signform.css";

const SignForm = (props) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  // Separate states for sign-in and sign-up
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    passwordConf: "",
    occupation: "",
    image:
      "https://res.cloudinary.com/dqqmgoftf/image/upload/v1725897781/u06hkxs8jf4waa1jn5t0.jpg",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(signInData);
      props.setUser(user);
      navigate("/");
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
  
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(signUpData.email)) {
      updateMessage("Invalid email format.");
      return;
    }
  
    if (!phoneRegex.test(signUpData.phone)) {
      updateMessage("Phone number must be 11 digits.");
      return;
    }
  
    if (signUpData.password.length < 8) {
      updateMessage("Password must be at least 8 characters long.");
      return;
    }
  
    if (signUpData.password !== signUpData.passwordConf) {
      updateMessage("Passwords do not match.");
      return;
    }
  
    try {
      const newUserResponse = await authService.signup(signUpData);
      props.setUser(newUserResponse.user);
      navigate("/");
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
        setSignUpData({ ...signUpData, image: res.data.url });
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
              value={signUpData.name}
              onChange={handleSignUpChange}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={signUpData.username}
              onChange={handleSignUpChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={signUpData.email}
              onChange={handleSignUpChange}
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={signUpData.phone}
              onChange={handleSignUpChange}
            />
            <input
              className="spaced-out"
              type="text"
              placeholder="Occupation"
              name="occupation"
              value={signUpData.occupation}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={signUpData.password}
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="passwordConf"
              value={signUpData.passwordConf}
              onChange={handleSignUpChange}
            />
            <input type="file" name="image" onChange={uploadImage} />
            <p className="error-message">{message}</p>

            {loading === false ? (
              <button type="submit">Sign Up</button>
            ) : (
              <p>Loading</p>
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
              value={signInData.username}
              onChange={handleSignInChange}
            />
            <input
              type="password"
              autoComplete="off"
              placeholder="Password"
              name="password"
              value={signInData.password}
              onChange={handleSignInChange}
            />
            <button className="sing-in" type="submit">Sign In</button>
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
