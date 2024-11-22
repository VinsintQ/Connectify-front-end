
import { useState,useEffect } from "react"
import jobService from "../../services/jobService"
import { useParams } from "react-router-dom"
const Viewapplications = () => {
    
    const [Apps, setApp] = useState([])
    const {compId,jobId} =useParams();

    useEffect(() => {    
        const fetchApp = async (jobId,compId) => {
          try {
            const Apps = await jobService.viewapp(jobId,compId);
            setApp(Apps);
            
          } catch (error) {
            console.error("Failed to jobs:", error);
          }
        };
        fetchApp(jobId,compId);
        }
        , [jobId]);


    return (
        <div>
            <h1>View Applications</h1>
           
           {Apps.map((app) => (
            <div key={app._id}>
              {/* <h4>{app.cv}</h4> */}
              <p>{app.email}</p>
              <p>{app.phoneNumber}</p>
              
              
            </div>
          ))}
            
        </div>
    )
}
export default Viewapplications