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
    <div>
      <h3>Education Details</h3>
      <p>School : {education.School}</p>
      <p>Degree : {education.Degree}</p>
      <p>Start Date: {new Date(education.StartDate).toLocaleDateString()}</p>
      <p>
        End Date:{" "}
        {education.EndDate
          ? new Date(education.EndDate).toLocaleDateString()
          : "Present"}
      </p>

      <button>
        <Link to={`update`}>Edit</Link>
      </button>

      <button onClick={handleDeleteClick}>Delete</button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this education?</Modal.Body>
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
