//restaurant form
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EducationService from "../../services/educationService";
import { useNavigate } from "react-router-dom";

//Services

const educationForm = ({ user }) => {
  const userId = user._id;
  const { educationId } = useParams();
  const navigate = useNavigate();
  const [educationData, setEducationData] = useState({
    School: "",
    Degree: "",
    StartDate: "",
    EndDate: "",
  });

  const handleChange = (e) => {
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (educationData.School.trim() !== "" && educationData.Degree.trim() !== "") {
      EducationService.create({ formData: educationData, userId });
      navigate("/profile");
    }
  };

  return (
    <main className="">
      <h1>add Education</h1>
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
          <label htmlFor="StartDate">StartDate:</label>
          <input
            type="date"
            id="StartDate"
            value={educationData.StartDate}
            name="StartDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="EndDate">EndDate : </label>
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
            {educationId ? <>Update</> : <>Add education</>}
          </button>
        </div>
      </form>
    </main>
  );
};

export default educationForm;
