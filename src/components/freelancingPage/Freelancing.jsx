import freelancnigService from "../../services/freelancnigService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import conversationServices from "../../services/conversationServices";
import "./Freelancing.css";

const Freelancing = ({user}) => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    const getConv = async () => {
      try {
        const data = await conversationServices.index(user._id);
        setConversation(data);
      } catch (error) {
        console.error("Failed to get conversations:", error);
      }
    };
    getConv();
  }, []);


  const handleAddConv = async (serviceProvider) => {
     const existingConversation = conversation.find((conv) =>
       conv.members.includes(serviceProvider)
     );

     if (user._id === serviceProvider) {
        return;
     }
     if (!existingConversation) {
   
      try {
        const Conversation = await conversationServices.create(
          user._id,
          serviceProvider
        );
       
        navigate("/chat");
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }

    }else {
      navigate("/chat");
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





             
             <div  onClick={()=>{handleAddConv(service.userId._id,user._id)}}>
              <img
                className="profile-image"
                src={service.userId.image}
                alt="Post"
              />
              {service.userId.username}
            </div> 

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
