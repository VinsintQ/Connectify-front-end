
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 import projectService from "../../services/projectService";

//Services

const ProjectForm = ({ handleAddPro,user ,handleUpdatePro}) => {
    const { proId } = useParams();



  const [proData, setproData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    const fetchPro = async () => {
      const proData = await projectService.show({ proId, user });
      setproData(proData);
    };

    if (proId) fetchPro();
  }
  , [proId]);

  const handleChange = (e) => {
    setproData({ ...proData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (proId) {
      handleUpdatePro({ proId,proData});
    }
    else {
    
    handleAddPro(proData);
    }
  };

  return (
    <main className="">
      <h1>{proId ? <>Update Project</> : <>New Project</>}</h1>
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
