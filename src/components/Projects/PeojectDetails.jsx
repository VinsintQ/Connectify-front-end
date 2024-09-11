import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import projectService from "../../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";

const ProjectDetails = ({ user }) => {
  const { proId } = useParams();
  const [project, setProject] = useState();
  const [showModal, setShowModal] = useState(false);

  // Handle opening the modal
  const deletePro = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = async () => {
    await projectService.deleter(proId, user);
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
    <div>
      <h3>Project Details</h3>
      <p>Project Name: {project?.name}</p>
      <p>Description: {project?.description}</p>

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
      {project.UserId === user._id && (
        <>
          <button>
            <Link to={`/project/${project._id}/update`}>Edit</Link>
          </button>
          <button onClick={deletePro}>Delete</button>
        </>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
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
