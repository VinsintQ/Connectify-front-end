// src/components/Dashboard.jsx

import { useState,useEffect } from "react";
import companyService from "../../services/companyService";

const myCompanies = ({ user }) => {
 const [allCompanies,setallCompanies] =  useState([])
 const [userId,setUserId] =  useState(user._id)

 useEffect(() => {
  
    const fetchCompanies = async (userId) => {
      try {
        const companies = await companyService.owned(userId);
        setallCompanies(companies);
        console.log(user._id);
      } catch (error) {
        console.error("Failed to companies:", error);
      }
    };
    fetchCompanies(userId);
  
}, [userId]);

    return (
      
      <main>
        <h1>these companies are owned by you,{user.username}</h1>
        {allCompanies.map((company) => (
         <div key={company._id}>
            <h2>{company.name}</h2>
          </div>
        ))}
       
      </main>
    );
  };
  
  export default myCompanies;