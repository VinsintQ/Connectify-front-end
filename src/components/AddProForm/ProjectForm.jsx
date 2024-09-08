
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


//Services

const ProjectForm = ({ handleAddPro,user }) => {
    const { proId } = useParams();



  const [proData, setproData] = useState({
    name: "",
    description: ""
  });

  const handleChange = (e) => {
    setproData({ ...proData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddPro(proData);
  };

  return (
    <main className="">
      <h1>New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name:</label>
          <input
            type="text"
            id="name"
          value={proData.name}
            name="name"
            onChange={handleChange}
          />
        </div>

       <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={proData.description}
            name="description"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">
            {proId ? <>Update</> : <>Add Project</>}
          </button>
        </div>
      </form>
    </main>
  );
};

export default ProjectForm;
