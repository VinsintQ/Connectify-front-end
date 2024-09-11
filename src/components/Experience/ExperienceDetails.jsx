import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import experienceService from "../../services/experienceService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ExperienceDetails.css"; // Import the CSS file

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
    <div className="container">
      <h3 className="heading">Experience Details</h3>
      <p className="details">Position: {experience.position}</p>
      <p className="details">Company: {experience.company}</p>
      <p className="details">Start Date: {new Date(experience.StartDate).toLocaleDateString()}</p>
      <p className="details">
        End Date:{" "}
        {experience.EndDate
          ? new Date(experience.EndDate).toLocaleDateString()
          : "Present"}
      </p>
      {experience.description && <p className="details">Description: {experience.description}</p>}

      {experience.UserId === user._id && (
        
        <div className="buttons">
          <Link to={`/experience/${experience._id}/update`}>
          <button className="button">
            Edit
          </button></Link>
          <button className="button" onClick={deleteExp} style={{ height: '40px' , margin: '24px'}}>Delete</button>
        </div>
      )}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Confirm Delete</Modal.Title>
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
