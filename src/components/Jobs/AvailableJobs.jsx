import { useEffect, useState } from "react";
import jobService from "../../services/jobService";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AvailableJobs.css"; 

const AvailableJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await jobService.index();
  
        // Filter out jobs the user has already applied for
        const filteredJobs = jobs.filter(
          (job) => !job.application.some((app) => app.userId === user._id)
        );
  
        setJobs(filteredJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };
  
    fetchJobs();
  }, []);

  const handleApply = (companyId, jobId, owner) => {
    if (owner === user._id) {
      setShowModal(true); 
    } else {
      navigate(`/company/${companyId}/apply/${jobId}`);
    }
  };

  const handleClose = () => {
    setShowModal(false); 
  };

  return (
    <div>
      <h1>Available Jobs</h1>

      {jobs.length > 0 ? (
        <div className="jobs-container">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h2>Company: {job.company.name}</h2>
              <h2>Job Title: {job.jobtitle}</h2>
              <p><strong>Workplace:</strong> {job.workplace}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Overview:</strong> {job.overview}</p>
              <p><strong>Job Type:</strong> {job.jobtype}</p>
              <button 
                className="app-btn" 
                onClick={() => handleApply(job.company._id, job._id, job.company.owner)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="no-jobs">There are no available jobs</h2>
      )}

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title className="modal-title">Application Not Allowed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You can't apply to your own job.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AvailableJobs;
