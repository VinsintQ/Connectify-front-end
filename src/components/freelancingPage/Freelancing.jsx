import freelancnigService from "../../services/freelancnigService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Freelancing.css";
const Freelancing = (user) => {

    const [services, setServices] = useState([]);
    
    useEffect(() => {
        const fetchServices = async () => {
          const data = await freelancnigService.getAllServices(user._id);
          setServices(data);
        };
        fetchServices();
      }, []);
    





    return (
        <div>
        
          <button className="freebtn">
          <Link to={"/MyServices"}>My Services</Link>
        </button>
         
        <div className="freelancing-container">
          {services.map((service) => (
            <div key={service._id} className="service">

                <Link to={`/profile/${service.userId._id}`}>
                     <img
                       className="profile-image"
                       src={service.userId.image}
                       alt="Post"
                     />
                    {service.userId.username}
                  </Link>


                
              <h2>{service.serviceTitle}</h2>
              <p><strong>Description:</strong> {service.description}</p>
              <p><strong>From :</strong> {service.startingPrice} usd </p>
             
            </div>
          ))}
        </div>
        </div>
    );
    }

 export default Freelancing;   