import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import userServices from "../../services/userServices";
import axios from "axios";

const updateProfileForm = ({ user, setuserData, userData }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // const userId = user._id;
  const userId = user._id;

  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    occupation: "",
    image: "",

    // "https://res.cloudinary.com/dqqmgoftf/image/upload/v1725897781/u06hkxs8jf4waa1jn5t0.jpg",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userServices.show(userId);

      setFormData(userData);
    };

    fetchUser();
  }, [userId]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userServices.update(userId, formData);
      navigate("/profile");
      setuserData(formData);
    } catch (err) {
      updateMessage(err.message);
    }
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
    <form onSubmit={handleSubmit} className="updateProfileForm">
      <p>{error}</p>
      <input
        className="spaced-out"
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        className="spaced-out"
        type="text"
        placeholder="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        className="spaced-out"
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className="spaced-out"
        type="text"
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <input
        className="spaced-out"
        type="text"
        placeholder="Occupation"
        name="occupation"
        value={formData.occupation}
        onChange={handleChange}
      />
      <input
        className="spaced-out"
        type="file"
        name="image"
        onChange={uploadImage}
      />
      <button type="submit">update</button>
    </form>
  );
};

export default updateProfileForm;
