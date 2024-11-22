
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import freelancnigService from "../../services/freelancnigService";
const Addservice = (user) => {
    const userId = user._id;
    const [serviceDate, setServiceDate] = useState({
        serviceTitle: "",
        description: "",
        category: "",
        startingPrice: "",
      });
    return ( <h1>addservice form </h1>

        

     






    )
}

export default Addservice;