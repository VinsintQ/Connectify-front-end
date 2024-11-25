import { useEffect, useState } from "react";
import jobService from "../../services/jobService";
import { Link } from "react-router-dom";
import "./AvailableJobs.css";  // Import the CSS file

const AvailableJobs = () => {
  
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const jobs = await jobService.index();
                setJobs(jobs);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            }
        };
        fetchJobs();
    }, []);

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
                            <Link to={`/company/${job.company._id}/apply/${job._id}`}>Apply</Link>
                        </div>
                    ))}
                </div>
            ) : (
                <h2 className="no-jobs">There are no available jobs</h2>
            )}
        </div>
    );
};

export default AvailableJobs;
