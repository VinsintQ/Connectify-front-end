import { useState, useEffect } from "react";
import jobService from "../../services/jobService";
import { useParams } from "react-router-dom";
import "./viewapp.css";
import AppDetails from "./viewappDetails";

const Viewapplications = () => {
  const [Apps, setApp] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null); // For modal
  const { compId, jobId } = useParams();

  useEffect(() => {
    const fetchApp = async (jobId, compId) => {
      try {
        const job = await jobService.show(compId, jobId);
        setApp(job.application);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      }
    };
    fetchApp(jobId, compId);
  }, [jobId, compId]);

  const openModal = (cv) => {
    setSelectedCV(cv);
  };

  const closeModal = () => {
    setSelectedCV(null);
  };

  return (
    <div className="applications-container">
      <h1>Applications</h1>
      {Apps.length === 0 ? (
        <p className="no-applications-message">No applications available for this job.</p>
      ) : (
        Apps.map((app) => (
          <div key={app._id} className="application-card">
            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Phone Number:</strong> {app.phoneNumber}</p>
            {app.cv && (
              <div>
                
                <button
                  onClick={() => openModal(app.cv)}
                  className="cv-button"
                >
                  View CV
                </button>
              </div>
            )}
          </div>
        ))
      )}
      {/* Modal */}
      {selectedCV && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            <img src={selectedCV} alt="CV" className="cv-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Viewapplications;
