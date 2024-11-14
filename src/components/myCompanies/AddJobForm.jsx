

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import companyService from "../../services/companyService";


const AddJobForm = ({ user,companyId }) => {
    const navigate = useNavigate();
    const { compId } = useParams();


    const [jobData, setJobData] = useState({
        jobtitle: "",
        location: "",
        workplace: "",
        jobtype: "",
        overview: "", 
        
    });
    
    const handleAddJob = async (jobData) => {
        const newJob = await companyService.addJob(compId, jobData);
        navigate(`/Mycompany/company/${compId}`);
    };

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleAddJob(jobData);
    }

    const isFormValid =
        jobData.jobtitle.trim() !== "" &&
        jobData.location.trim() !== "" &&
        jobData.workplace.trim() !== "" &&
        jobData.jobtype.trim() !== "" &&
        jobData.overview.trim() !== "";

    return (

        <main>


            <h1>New Job</h1>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="jobtitle">Job Title:</label>
                    <input
                        type="text"
                        id="jobtitle"
                        value={jobData.jobtitle}
                        name="jobtitle"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={jobData.location}
                        name="location"
                        onChange={handleChange}
                    />
                </div>


                <div>
    <label htmlFor="workplace">Workplace:</label>
    <select
        id="workplace"
        value={jobData.workplace}
        name="workplace"
        onChange={handleChange}
    >
        <option value="">Select Workplace</option>
        <option value="onsite">Onsite</option>
        <option value="hybrid">Hybrid</option>
        <option value="remote">Remote</option>
    </select>
</div>

<div>
    <label htmlFor="jobtype">Job Type:</label>
    <select
        id="jobtype"
        value={jobData.jobtype}
        name="jobtype"
        onChange={handleChange}
    >
        <option value="">Select Job Type</option>
        <option value="fulltime">Full-time</option>
        <option value="parttime">Part-time</option>
        <option value="internship">Internship</option>
        <option value="temporary">Temporary</option>
    </select>
</div>


                <div>
                    <label htmlFor="overview">Overview:</label>
                    <textarea
                        id="overview"
                        value={jobData.overview}
                        name="overview"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" disabled={!isFormValid}>Add Job</button>
            </form>
        </main>
    );
}

export default AddJobForm;