
import { Navigate, useNavigate, useParams } from "react-router-dom"
import companyService from "../../services/companyService"
import jobService from "../../services/jobService"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
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
        <div>
            <h1>View Jobs</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>location</th>
                        <th>overview</th>
                        <th>workplace</th>
                        <th>jobtype</th>
                        <th>applications</th>
                        <th>update</th>
                        <th>delete</th>
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
                            <td> <Link to={`/Mycompany/${compId}/viewapplications/${job._id}`}>view</Link>    </td>
                            <td><Link to={`/MyCompany/company/${compId}/jobs/${job._id}/updateJob`}>update</Link></td>
                            <td> <button onClick={() => deleteJob({jobId:job._id})}>
            Delete Job
        </button></td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    )
}

export default ViewJobs