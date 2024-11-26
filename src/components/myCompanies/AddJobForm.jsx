

import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import companyService from "../../services/companyService";
import jobService from "../../services/jobService";
import "./AddJobForm.css";
const AddJobForm = ({}) => {
    const navigate = useNavigate();
    const { compId } = useParams();
    const { jobId } = useParams();

    const [jobData, setJobData] = useState({
        jobtitle: "",
        location: "",
        workplace: "",
        jobtype: "",
        overview: "", 
        
    });
    
    useEffect(() => {
        const fetchJob = async () => {
            const jobData = await jobService.show(compId, jobId);
            setJobData(jobData);
        };
      
        if (jobId) fetchJob();
    }, [jobId]);

    const handleAddJob = async (jobData) => {
        const newJob = await companyService.addJob(compId, jobData);
        navigate(`/Mycompany/company/${compId}/jobs`);
    };

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (jobId) {
            await jobService.update(compId, jobId, jobData);
            navigate(`/Mycompany/company/${compId}/jobs`);
            return;
        }else{
        handleAddJob(jobData);
        }
    }

    const isFormValid =
        jobData.jobtitle.trim() !== "" &&
        jobData.location.trim() !== "" &&
        jobData.workplace.trim() !== "" &&
        jobData.jobtype.trim() !== "" &&
        jobData.overview.trim() !== "";

    return (

        <main className="add-job-container">
        <h1 className="form-title">{jobId ? "Update Job" : "New Job"}</h1>
        <form className="add-job-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="jobtitle">Job Title:</label>
            <input
              type="text"
              id="jobtitle"
              className="form-input"
              value={jobData.jobtitle}
              name="jobtitle"
              onChange={handleChange}
            />
          </div>
      
          <div className="form-group">
            <label className="form-label" htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              className="form-input"
              value={jobData.location}
              name="location"
              onChange={handleChange}
            />
          </div>
      
          <div className="form-group">
            <label className="form-label" htmlFor="workplace">Workplace:</label>
            <select
              id="workplace"
              className="form-select"
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
      
          <div className="form-group">
            <label className="form-label" htmlFor="jobtype">Job Type:</label>
            <select
              id="jobtype"
              className="form-select"
              value={jobData.jobtype}
              name="jobtype"
              onChange={handleChange}
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
              <option value="temporary">Temporary</option>
            </select>
          </div>
      
          <div className="form-group">
            <label className="form-label" htmlFor="overview">Overview:</label>
            <textarea
              id="overview"
              className="form-input"
              value={jobData.overview}
              name="overview"
              onChange={handleChange}
            />
          </div>
      
          <button
            type="submit"
            className="form-button"
            disabled={!isFormValid}
          >
            {jobId ? "Update Job" : "Add Job"}
          </button>
        </form>
      </main>
      
    );
}

export default AddJobForm;