import { useState, useEffect } from "react";
import jobService from "../../services/jobService";
import { useParams } from "react-router-dom";
import "./viewapp.css";

const Viewapplications = () => {
  const [Apps, setApp] = useState([]);
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
                <strong>CV:</strong>
                <a href={app.cv} target="_blank" rel="noopener noreferrer" className="cv-button">
                  View CV
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Viewapplications;
