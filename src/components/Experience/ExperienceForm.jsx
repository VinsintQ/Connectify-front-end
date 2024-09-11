
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import experienceService from "../../services/experienceService";
import "./ExperienceForm.css";

//Services

const ExpForm = ({ handleAddExp,handleUpdateExp,user }) => {
  const { expId } = useParams();

  useEffect(() => {
    const fetchexper = async () => {
      const experData = await experienceService.show({ expId, user });
  
      
      if (experData) {
        if (experData.StartDate) {
          const startDate = new Date(experData.StartDate);
          experData.StartDate = startDate.toISOString().split('T')[0]; 
        }
  
        if (experData.EndDate) {
          const endDate = new Date(experData.EndDate);
          experData.EndDate = endDate.toISOString().split('T')[0]; 
        }
      }
  
      setExpData(experData);
    };
  
    if (expId) fetchexper();
  }, [expId]);
  
  

  const [expData, setExpData] = useState({
    company: "",
    position: "",
   
    StartDate: "",
    EndDate: "",
    Description: "",
  });

  const handleChange = (e) => {
    setExpData({ ...expData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if (
      expData.company.trim() !== "" &&
      expData.position.trim() !== "" &&
      expData.Description.trim() !== ""
    ) 
    

    if (expId) {
      handleUpdateExp({ expId,expData});
    }else {
      handleAddExp(expData);
    }
    
  };

  return (

    <main className="expForm">
      <h1>{expId ? <>Update Experience</> : <>New Experience</>}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="company">compnay:</label>
          <input
            type="text"
            id="company"
            value={expData.company}
            name="company"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="position">position:</label>
          <input
            type="text"
            id="position"
            value={expData.position}
            name="position"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="StartDate">StartDate:</label>
          <input
            type="date"
            id="StartDate"
            value={expData.StartDate}
            name="StartDate"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="EndDate">EndDate : </label>
          <input
            type="date"
            id="EndDate"
            value={expData.EndDate}
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
            {expId ? <>Update</> : <>Add Experience</>}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ExpForm;
