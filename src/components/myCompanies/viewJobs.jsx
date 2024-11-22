
import { useParams } from "react-router-dom"
import companyService from "../../services/companyService"
import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
const ViewJobs = () => {
    const { compId } = useParams();
    const [jobs, setJobs] = useState([])
    
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
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    )
}

export default ViewJobs