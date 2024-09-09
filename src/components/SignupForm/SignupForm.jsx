// SignupForm.jsx
import authService from "../../services/authService";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState([""]);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
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
        const newUserResponse = await authService.signup(formData);
        props.setUser(newUserResponse.user);
        navigate("/");
      } else {
        console.log("Please fill all the fields");
      }
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const {
    username,
    password,
    passwordConf,
    name,
    phone,
    email,
    occupation,
    image,
  } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (event) => {
    const files = event.target.files[0];
    if (!files) return;
    const base64 = await convertBase64(files);
    setLoading(true);
    axios
      .post("http://localhost:3000/upload", { image: base64 })
      .then((res) => {
        setUrl(res.data.url);
        setFormData({ ...formData, image: res.data.url });
        alert("Image uploaded successfully");
      })
      .then(() => {
        setLoading(false);
      })
      .catch(console.log);
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
            id="username"
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
        <div className="signup-form-group">
          <label htmlFor="occupation">Occupation</label>
          <input
            type="text"
            id="occupation"
            value={occupation}
            name="occupation"
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
          <label htmlFor="confirm">Profile Image:</label>
          <input type="file" id="image" name="image" onChange={uploadImage} />
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
