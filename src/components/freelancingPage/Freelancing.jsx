import freelancnigService from "../../services/freelancnigService";

import { useEffect, useState } from "react";
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
        <h1>Freelancing</h1>
        <div className="freelancing-container">
          {services.map((service) => (
            <div key={service._id} className="service">
            <p>{service.userId.username}</p>    
              <h2>{service.serviceTitle}</h2>
              <p>{service.description}</p>
              <p>From :{service.startingPrice} usd </p>
            </div>
          ))}
        </div>
        </div>
    );
    }

 export default Freelancing;   