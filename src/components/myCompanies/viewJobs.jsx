
import { Navigate, useNavigate, useParams } from "react-router-dom"
import companyService from "../../services/companyService"
import jobService from "../../services/jobService"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import "./viewJobs.css"
const ViewJobs = () => {
    const { compId } = useParams();
    const [jobs, setJobs] = useState([])
    const navigate = useNavigate();
   useEffect(() => {    
    const fetchJobs = async (compId) => {
      try {
        const jobs = await companyService.ViewJobs(compId);
        setJobs(jobs);
        
      } catch (error) {
        console.error("Failed to jobs:", error);
      }
    };
    fetchJobs(compId);
    }
    , [compId]);

    
    const deleteJob = async ({jobId}) => {
        try {
             await jobService.deleteJob(compId, jobId);
             window.location.reload();
        } catch (error) {
            console.error("Failed to delete job:", error);
        }
    }

    return (
        <div className="view-jobs-container">
  <h1 className="view-jobs-title">View Jobs</h1>
  <table className="jobs-table">
    <thead>
      <tr>
        <th>Job Title</th>
        <th>Location</th>
        <th>Overview</th>
        <th>Workplace</th>
        <th>Job Type</th>
        <th>Applications</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {jobs.map((job) => (
        <tr key={job.id}>
          <td>{job.jobtitle}</td>
          <td>{job.location}</td>
          <td>{job.overview}</td>
          <td>{job.workplace}</td>
          <td>{job.jobtype}</td>
          <td>
            <Link
              to={`/Mycompany/${compId}/viewapplications/${job._id}`}
              className="view-link"
            >
              View
            </Link>
          </td>
          <td>
            <Link
              to={`/MyCompany/company/${compId}/jobs/${job._id}/updateJob`}
              className="update-link"
            >
              Update
            </Link>
          </td>
          <td>
            <button
              className="delete-button"
              onClick={() => deleteJob({ jobId: job._id })}
            >
              Delete Job
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    )
}

export default ViewJobs