import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jobService from "../../services/jobService"; 
import "./ApplyForm.css";

const ApplyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phoneNumber: "",
    email: "",
    cv: "",
  });
 
  const {jobId}= useParams();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  const uploadCV = async (event) => {
    const files = event.target.files[0];
    if (!files) return;

    setError("");
    setLoading(true);

    try {
      const base64 = await convertBase64(files);
      setFormData({ ...formData, cv: base64 });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to upload the CV. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.phoneNumber || !formData.email || !formData.cv) {
      setError("All fields are required.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      
      await jobService.apply( jobId , formData);
      setLoading(false);
      navigate("/Jobs"); 
    } catch (err) {
      setLoading(false);
      setError("Failed to submit the application. Please try again.");
    }
  };

  return (
    <main className="applyForm">
      <h1>Apply for Job</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="number">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cv">Upload your CV:</label>
          <input type="file" id="cv" name="cv" onChange={uploadCV} />
        </div>
        {error && <p className="error">{error}</p>}
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button type="submit">Apply</button>
          )}
        </div>
      </form>
    </main>
  );
};

export default ApplyForm;
