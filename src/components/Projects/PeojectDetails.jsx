import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import projectService from "../../services/projectService";
const ProjectDetails = ({user}) => {

  const deletePro = async () => {
    await projectService.deleter(proId,user);
    window.location.replace("/profile");
  }
    
  const { proId } = useParams();
  const [project, setproject] = useState();

  useEffect(() => {
    async function getProject() {
      const projectData = await projectService.show({proId,user});
      setproject(projectData);
    }
    getProject();
  }, [proId]);

  if (!project) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }
    return (
        <div>
            <h3>Project Details</h3>
            <p>Project Name : {project?.name}</p>
            <p>Description : {project?.description}</p>

            {project && project.tools && project.tools.length > 0 && (
  <>
    <p>Tools:</p>
    <ul>
      {project.tools.map((tool) => (
        <li key={tool._id}>{tool.tool}</li>
      ))}
    </ul>
  </>
)}
              
            
            <button >

              {<Link to={`/project/${project._id}/update`}>Edit</Link>}
            </button>

            <button onClick={deletePro}>delete</button>
        </div>
    )
}

export default ProjectDetails ;