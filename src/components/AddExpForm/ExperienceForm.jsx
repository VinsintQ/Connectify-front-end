//restaurant form
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Services 
import experienceService from "../../services/experienceService";

const ExpForm = () => {
  const {resId} = useParams();
 
  useEffect(() => {
    const fetchRes = async () => {
      const bookData = await resService.show(resId)
      
      
      setRestrData(bookData);
    };
    if (resId) fetchRes();
  }, [resId]);
  


  const [resData, setRestrData] = useState({
    name: "",
    location: "",
    category: "",
    operatingHours: "",
    resimage: "",
  });

  const handleChange = (e) => {
    setRestrData({ ...resData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(resId){
     
    handleUpdateRes(resId,resData);
    } else {
      handleAddRestaurant(resData);
    }
    
  };

  return (
    <main className="newRestrCont">
      <h1>New Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={resData.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">location:</label>
          <input
            type="text"
            id="location"
            value={resData.location}
            name="location"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={resData.category}
            name="category"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="operatingHours">operatingHours:</label>
          <input
            type="text"
            id="operatingHours"
            value={resData.operatingHours}
            name="operatingHours"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="resimage">Restaurant Picture:</label>
          <input
            type="text"
            id="resimage"
            value={resData.resimage}
            name="resimage"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn1">
           {resId ? <>Update</>:<>Create Restaurant</>} 
          </button>
        </div>
      </form>
    </main>
  );
};

export default ExpForm;