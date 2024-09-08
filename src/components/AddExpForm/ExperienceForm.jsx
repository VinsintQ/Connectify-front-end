
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


//Services

const ExpForm = ({ handleAddExp }) => {
  const { expId } = useParams();


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
    handleAddExp(expData);
  };

  return (
    <main className="">
      <h1>New Experience</h1>
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
