import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import experienceService from "../../services/experienceService";
import "./ExperienceForm.css";

const ExpForm = ({ handleAddExp, handleUpdateExp, user }) => {
  const { expId } = useParams();

  const [expData, setExpData] = useState({
    company: "",
    position: "",
    StartDate: "",
    EndDate: "",
    Description: "",
  });

  const [error, setError] = useState(""); // State to handle validation error messages

  useEffect(() => {
    const fetchexper = async () => {
      const experData = await experienceService.show({ expId, user });

      if (experData) {
        if (experData.StartDate) {
          const startDate = new Date(experData.StartDate);
          experData.StartDate = startDate.toISOString().split("T")[0];
        }

        if (experData.EndDate) {
          const endDate = new Date(experData.EndDate);
          experData.EndDate = endDate.toISOString().split("T")[0];
        }
      }

      setExpData(experData);
    };

    if (expId) fetchexper();
  }, [expId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const today = new Date().toISOString().split("T")[0];

    // Validate StartDate and EndDate
    if (name === "StartDate") {
      if (value > today) {
        setError("Start Date cannot be in the future.");
        return;
      }
    }

    if (name === "EndDate") {
      if (value > today) {
        setError("End Date cannot be in the future.");
        return;
      }
    }

    if (name === "StartDate" || name === "EndDate") {
      let newStartDate = name === "StartDate" ? value : expData.StartDate;
      let newEndDate = name === "EndDate" ? value : expData.EndDate;

      if (newStartDate && newEndDate && newStartDate > newEndDate) {
        setError("Start Date cannot be after End Date.");
        return;
      }
    }

    setError(""); // Clear error if validation passes
    setExpData({ ...expData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    // Ensure Start Date is valid
    if (expData.StartDate && expData.StartDate > today) {
      setError("Start Date cannot be in the future.");
      return;
    }

    // Ensure End Date is valid
    if (expData.EndDate && expData.EndDate > today) {
      setError("End Date cannot be in the future.");
      return;
    }

    // Ensure Start Date is not after End Date
    if (expData.StartDate && expData.EndDate && expData.StartDate > expData.EndDate) {
      setError("Start Date cannot be after End Date.");
      return;
    }

    // Ensure required fields are not empty
    if (expData.company.trim() === "" || expData.position.trim() === "") {
      setError("Company and Position are required fields.");
      return;
    }

    // Call the appropriate handler for Add or Update
    if (expId) {
      handleUpdateExp({ expId, expData });
    } else {
      handleAddExp(expData);
    }
  };

  return (
    <main className="expForm">
      <h1>{expId ? "Update Experience" : "New Experience"}</h1>
      {error && <p style={{ color: "red", fontSize: "15px", marginBottom: "10px" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            value={expData.company}
            name="company"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={expData.position}
            name="position"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="StartDate">Start Date:</label>
          <input
            type="date"
            id="StartDate"
            value={expData.StartDate}
            name="StartDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="EndDate">End Date: </label>
          <input
            type="date"
            id="EndDate"
            value={expData.EndDate || ""}
            name="EndDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <input
            type="text"
            id="Description"
            value={expData.Description}
            name="Description"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">
            {expId ? "Update" : "Add Experience"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ExpForm;
