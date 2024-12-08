import freelancnigService from "../../services/freelancnigService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import conversationServices from "../../services/conversationServices";
import "./Freelancing.css";

const Freelancing = ({user}) => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 const [id, setId] = useState(user._id);
 

  const handleAddConv = async (serviceProvider) => {
   
   
      try {
        const Conversation = await conversationServices.create(
          id,
          serviceProvider._id
        );

        
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    

   
  };



  useEffect(() => {
    const fetchServices = async () => {
      const data = await freelancnigService.getAllServices(user._id);
      setServices(data);
    };
    fetchServices();
  }, [user._id]);

 
  const filteredServices = services.filter((service) =>
    service.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>

      <div className="search">
        <input
          type="text"
          placeholder="Search by service title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-in"
        />
      </div>


      <button className="freebtn">
        <Link to={"/MyServices"}>My Services</Link>
      </button>

      
      

      <div className="freelancing-container">
        {filteredServices.map((service) => (
          <div key={service._id} className="service">





             
             <Link to={`/chat`} onClick={()=>{handleAddConv(service.userId,user._id)}}>
              <img
                className="profile-image"
                src={service.userId.image}
                alt="Post"
              />
              {service.userId.username}
            </Link> 

            <h2>{service.serviceTitle}</h2>
            <p><strong>Description:</strong> {service.description}</p>
            <p><strong>From:</strong> {service.startingPrice} usd</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Freelancing;
