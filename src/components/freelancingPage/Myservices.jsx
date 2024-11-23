import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import freelancnigService from "../../services/freelancnigService";
import "bootstrap/dist/css/bootstrap.min.css";

const MyServices = ({ user }) => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await freelancnigService.getmyServices(user._id);
      setServices(data);
    };
    fetchServices();
  }, []);

  // Open modal and store the service ID
  const deleteService = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowModal(true);
  };

  // Close modal
  const handleClose = () => {
    setShowModal(false);
    setServiceToDelete(null);
  };

  // Confirm deletion
  const handleConfirm = async () => {
    try {
      await freelancnigService.deleteService({ userId: user._id, serviceId: serviceToDelete });
      const data = await freelancnigService.getmyServices(user._id);
      setServices(data); // Refresh services list
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      handleClose(); // Close modal
    }
  };

  return (
    <div>
      <h3>Become a freelancer by starting to add services</h3>
      <Link to={"/addService"}>Add Services</Link>
      <h1>My Services</h1>
      <div className="freelancing-container">
        {services.map((service) => (
          <div key={service._id} className="service">
            <p>{service.userId.username}</p>
            <h2>{service.serviceTitle}</h2>
            <p>{service.description}</p>
            <p>From: {service.startingPrice} USD</p>
            <Link to={`/${service._id}/updateService`}>Edit</Link>
            <button className="btn btn-danger" onClick={() => deleteService(service._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this service?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyServices;
