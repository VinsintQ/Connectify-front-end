import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EducationService from "../../services/educationService";


const EducationForm = ({ user, handleUpdateEducation }) => {
  const userId = user._id;
  const { eduId } = useParams();
  const navigate = useNavigate();

  const [educationData, setEducationData] = useState({
    School: "",
    Degree: "",
    StartDate: "",
    EndDate: "",
  });

  const [error, setError] = useState(""); // State to handle validation error messages

  useEffect(() => {
    const fetchEducation = async () => {
      const educationData = await EducationService.show({ eduId, user });
      if (educationData) {
        if (educationData.StartDate) {
          const startDate = new Date(educationData.StartDate);
          educationData.StartDate = startDate.toISOString().split("T")[0];
        }

        if (educationData.EndDate) {
          const endDate = new Date(educationData.EndDate);
          educationData.EndDate = endDate.toISOString().split("T")[0];
        }
      }

      setEducationData(educationData);
    };

    if (eduId) fetchEducation();
  }, [eduId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate StartDate and EndDate
    if (name === "StartDate" || name === "EndDate") {
      const newStartDate = name === "StartDate" ? value : educationData.StartDate;
      const newEndDate = name === "EndDate" ? value : educationData.EndDate;

      if (newStartDate && newEndDate && newStartDate > newEndDate) {
        setError("Start Date cannot be after End Date.");
        return;
      }

      // Check if StartDate is equal to EndDate
      if (newStartDate && newEndDate && newStartDate === newEndDate) {
        setError("Start Date cannot be the same as End Date.");
        return;
      } else {
        setError(""); // Clear error if validation passes
      }
    }

    setEducationData({ ...educationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (
      educationData.School.trim() === "" ||
      educationData.Degree.trim() === "" ||
      educationData.StartDate.trim() === "" ||
      educationData.EndDate.trim() === ""
    ) {
      setError("All fields are required.");
      return;
    }

    // Ensure Start Date is not after End Date
    if (educationData.StartDate > educationData.EndDate) {
      setError("Start Date cannot be after End Date.");
      return;
    }

    // Ensure Start Date is not the same as End Date
    if (educationData.StartDate === educationData.EndDate) {
      setError("Start Date cannot be the same as End Date.");
      return;
    }

    // Handle Add or Update
    if (eduId) {
      handleUpdateEducation({ eduId, educationData });
      navigate("/profile");
    } else {
      await EducationService.create({ formData: educationData, userId });
      navigate("/profile");
    }
  };

  return (
    <main className="eduForm">
      <h1>{eduId ? "Update Education" : "Add Education"}</h1>
      {error && <p style={{ color: "red", fontSize: "15px", marginBottom: "10px" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="School">School:</label>
          <input
            type="text"
            id="School"
            value={educationData.School}
            name="School"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Degree">Degree:</label>
          <input
            type="text"
            id="Degree"
            value={educationData.Degree}
            name="Degree"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="StartDate">Start Date:</label>
          <input
            type="date"
            id="StartDate"
            value={educationData.StartDate}
            name="StartDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="EndDate">End Date:</label>
          <input
            type="date"
            id="EndDate"
            value={educationData.EndDate}
            name="EndDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">
            {eduId ? "Update" : "Add Education"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EducationForm;
