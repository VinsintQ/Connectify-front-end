import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import educationService from "../../services/educationService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./educationDetails.css";

const EducationDetails = ({ user }) => {
  const navigate = useNavigate();
  const { eduId } = useParams();
  const [education, setEducation] = useState();
  const [showModal, setShowModal] = useState(false);

  const deleteEdu = async () => {
    await educationService.deleter(eduId, user._id);
    navigate("/profile");
  };

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    deleteEdu();
    setShowModal(false);
  };

  useEffect(() => {
    async function getEdu() {
      const eduData = await educationService.show({ user, eduId });
      setEducation(eduData);
    }
    getEdu();
  }, [eduId]);

  if (!education) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <div className="container">
      <h3 className="heading">Education Details</h3>
      <p className="details">School: {education.School}</p>
      <p className="details">Degree: {education.Degree}</p>
      <p className="details">Start Date: {new Date(education.StartDate).toLocaleDateString()}</p>
      <p className="details">
        End Date:{" "}
        {education.EndDate
          ? new Date(education.EndDate).toLocaleDateString()
          : "Present"}
      </p>

      {education.UserId === user._id && (
        <div className="buttons">
          <button className="button">
            <Link to={`update`}>Edit</Link>
          </button>
          <button className="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this education?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
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

export default EducationDetails;
