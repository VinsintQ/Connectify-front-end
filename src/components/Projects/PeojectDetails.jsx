import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import projectService from "../../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./projectDetails.css"; 

const ProjectDetails = ({ user }) => {
  const { proId } = useParams();
  const [project, setProject] = useState();
  const [showModal, setShowModal] = useState(false);

 
  const deletePro = () => {
    setShowModal(true);
  };

 
  const handleClose = () => {
    setShowModal(false);
  };


  const handleConfirmDelete = async () => {
    await projectService.deleter(proId, user._id);
    window.location.replace("/profile");
  };

  useEffect(() => {
    async function getProject() {
      const projectData = await projectService.show({ proId, user });
      setProject(projectData);
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
    <div className="container">
      <h3 className="heading">Project Details</h3>
      <p className="details">Project Name: {project.name}</p>
      <p className="details">Description: {project.description}</p>

      {project.tools && project.tools.length > 0 && (
        <>
          <p className="details">Tools:</p>
          <ul>
            {project.tools.map((tool) => (
              <li key={tool._id}>{tool.tool}</li>
            ))}
          </ul>
        </>
      )}
      {project.userId === user._id && (
        <div className="buttons">
          <button className="button">
            <Link to={`/project/${project._id}/update`}>Edit</Link>
          </button>
          <button className="button" onClick={deletePro}>
            Delete
          </button>
        </div>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this project?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectDetails;
