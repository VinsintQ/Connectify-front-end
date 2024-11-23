
import { useState,useEffect } from "react"
import jobService from "../../services/jobService"
import { useParams } from "react-router-dom"
const Viewapplications = () => {
    
    const [Apps, setApp] = useState([])
    const {compId,jobId} =useParams();

    useEffect(() => {    
        const fetchApp = async (jobId,compId) => {
          try {
            const job = await jobService.show(compId,jobId);
            setApp(job.application);
            
          } catch (error) {
            console.error("Failed to jobs:", error);
          }
        };
        fetchApp(jobId,compId);
        }
        , [jobId]);


    return (
      <div>
        <h1>Applications</h1>
        {Apps.map((app) => (
          <div key={app._id}>
            
            <p> Email :{app.email}</p>
            <p>PhoneNumber :{app.phoneNumber}</p>
            {/* <p> Cv : {app.cv}</p> */}
          </div>
        ))}
      </div>
    )
}
export default Viewapplications