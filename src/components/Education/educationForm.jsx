//restaurant form
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EducationService from "../../services/educationService";
import { useNavigate } from "react-router-dom";

//Services

const educationForm = ({ user , handleUpdateEducation }) => {

const navigate = useNavigate();
const { educationId } = useParams();
const [userId, setUserId] = useState(user._id);
const [educationData, setEducationData] = useState({
  School: "",
  Degree: "",
  StartDate: "",
  EndDate: "",
});

  useEffect(() => {

    


    const fetchEducation = async () => {
      const eduData = await EducationService.index( userId, educationId );
  
      
      if (eduData) {
        if (eduData.StartDate) {
          const startDate = new Date(eduData.StartDate);
          eduData.StartDate = startDate.toISOString().split('T')[0]; 
        }
  
        if (eduData.EndDate) {
          const endDate = new Date(eduData.EndDate);
          eduData.EndDate = endDate.toISOString().split('T')[0]; 
        }
      }
  
      setEducationData(eduData);
    };
  
    if (educationId) fetchEducation();
  }, [educationId]);


  


  const handleChange = (e) => {
    setEducationData({ ...educationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (educationData.School.trim() !== "" && educationData.Degree.trim() !== "") {
      
    if (educationId) {
      handleUpdateEducation({ educationId,educationData});
    }else {
      EducationService.create(educationData, userId);
      navigate("/profile");
    }
    




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
