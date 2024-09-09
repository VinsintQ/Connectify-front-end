import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import experienceService from "../../services/experienceService";
import "bootstrap/dist/css/bootstrap.min.css";

const ExperienceDetails = ({ user }) => {
  const { expId } = useParams();
  const [experience, setExperience] = useState();
  const [showModal, setShowModal] = useState(false);

  // Handle opening the modal
  const deleteExp = () => {
    setShowModal(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setShowModal(false);
  };

  // Handle confirming the deletion
  const handleConfirm = async () => {
    await experienceService.deleter(expId, user._id);
    window.location.replace("/profile");
  };

  useEffect(() => {
    async function getExp() {
      const expData = await experienceService.show({ user, expId });
      setExperience(expData);
    }
    getExp();
  }, [expId]);

  if (!experience) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <div>
      <h3>Experience Details</h3>
      <p>Position: {experience.position}</p>
      <p>Company: {experience.company}</p>
      <p>Start Date: {new Date(experience.StartDate).toLocaleDateString()}</p>
      <p>
        End Date:{" "}
        {experience.EndDate
          ? new Date(experience.EndDate).toLocaleDateString()
          : "Present"}
      </p>
      {experience.description && <p>Description: {experience.description}</p>}

      <button>
        <Link to={`/experience/${experience._id}/update`}>Edit</Link>
      </button>
      <button onClick={deleteExp}>Delete</button>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this experience?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ExperienceDetails;
