
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import freelancnigService from "../../services/freelancnigService";
import { useNavigate } from "react-router-dom";

const Addservice = ({user}) => {
    
    const [userId] = useState(user._id);
    const navigate = useNavigate();
    const { serviceId } = useParams();

    useEffect(() => {
      if (serviceId) {
        const fetchService = async () => {
          try {
            const data = await freelancnigService.show(userId, serviceId);
            setServiceDate(data);
          } catch (error) {
            console.error("Error fetching service:", error);
          }
        };
    
        fetchService();
      }
    }, [serviceId]);
    


    const [serviceData, setServiceDate] = useState({
        serviceTitle: "",
        description: "",
        category: "",
        startingPrice: "",
      });
      
      const handleChange = (e) => {
        setServiceDate({ ...serviceData, [e.target.name]: e.target.value });
      }
      const handleSubmit = async (e) => {
          
        e.preventDefault();
         
        if (serviceId) {
            await freelancnigService.updateService({ userId, serviceId, formData: serviceData });
            navigate("/MyServices");
          }else {


          freelancnigService.addService({userId,formData: serviceData });
          navigate("/MyServices");
        }
      };

      return (
        <main className="eduForm">
          <h1>Add Service</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="serviceTitle">serviceTitle:</label>
              <input
                type="text"
                id="serviceTitle"
                value={serviceData.serviceTitle}
                name="serviceTitle"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description">description:</label>
              <input
                type="text"
                id="description"
                value={serviceData.description}
                name="description"
                onChange={handleChange}
              />
            </div>
    
           
            <div>
              <label htmlFor="startingPrice">startingPrice : </label>
              <input
                type="number"
                id="startingPrice"
                value={serviceData.startingPrice}
                name="startingPrice"
                onChange={handleChange}
              />USD
            </div>
    
            <div>
              <button type="submit">
               {serviceId ? <>Update Service</> : <>Post Service</>}
              </button>
            </div>
          </form>
        </main>
      );
    }

export default Addservice;