
import { useEffect, useState } from "react";
import jobService from "../../services/jobService";
import { Link } from "react-router-dom";


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
    }
    , []);

    return (
        <div>
        <h1>Available Jobs</h1>
         
        {jobs.length > 0 ? (
            <>
                {jobs.map((job) => (
                    <div key={job._id}>
                        <h2>company : {job.company.name}</h2>
                        <h2>Job Title : {job.jobtitle}</h2>     
                        <p>workplace : {job.workplace}</p>
                        <p>Location : {job.location}</p>
                        <p>overview : {job.overview}</p>
                        <p>jobtype : {job.jobtype}</p>
                        <Link to={`/company/${job.company._id}/apply/${job._id}`}>Apply</Link>
                    </div>
                ))}
            </>
        ) : (
            <h2>There are no available jobs</h2>
        )}


        </div>
    );
    }


export default AvailableJobs;    