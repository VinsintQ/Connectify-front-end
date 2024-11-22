
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import freelancnigService from "../../services/freelancnigService";
import { useNavigate } from "react-router-dom";
const Addservice = ({user}) => {
    
    const [userId] = useState(user._id);
    const navigate = useNavigate();
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
        
          freelancnigService.addService({userId,formData: serviceData });
          navigate("/freelancing");
        
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
              <label htmlFor="category">category :</label>
              <input
                type="text"
                id="category"
                value={serviceData.category}
                name="category"
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
              />
            </div>
    
            <div>
              <button type="submit">
               Post Service
              </button>
            </div>
          </form>
        </main>
      );
    }

export default Addservice;