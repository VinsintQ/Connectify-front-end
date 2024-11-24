import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import freelancnigService from "../../services/freelancnigService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./myservice.css";
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

  
  const deleteService = (serviceId) => {
    setServiceToDelete(serviceId);
    setShowModal(true);
  };

  
  const handleClose = () => {
    setShowModal(false);
    setServiceToDelete(null);
  };

 
  const handleConfirm = async () => {
    try {
      await freelancnigService.deleteService({ userId: user._id, serviceId: serviceToDelete });
      const data = await freelancnigService.getmyServices(user._id);
      setServices(data); 
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      handleClose(); 
    }
  };

  return (
    <div>
    <h1 className="text-center">My Services</h1>
    <div className="text-center my-4">
      <Link to="/addService">
        <button className="btn btn-primary">Add Services</button>
      </Link>
    </div>
  
    
    {services.length === 0 ? (
      <div className="no-services-message text-center">
        <h2>You currently have no services.</h2>
        <p>
          Become a freelancer by creating your first service! Click the button above to get started.
        </p>
      </div>
    ) : (
      <div className="freelancing-container">
        {services.map((service) => (
          <div key={service._id} className="service card p-3 mb-3 text-center">
            <p><strong>User:</strong> {service.userId.username}</p>
            <h2>{service.serviceTitle}</h2>
            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>From:</strong> {service.startingPrice} USD</p>
           
            <div className="button-container">
              <Link to={`/${service._id}/updateService`}>
                <button className="btn btn-secondary">Edit</button>
              </Link>
              <button className="btn btn-danger" onClick={() => deleteService(service._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  
    
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this service?</Modal.Body>
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
