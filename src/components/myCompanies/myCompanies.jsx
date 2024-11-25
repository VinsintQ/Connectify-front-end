
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import companyService from "../../services/companyService";
import "./mycompany.css";
const myCompanies = ({ user }) => {
 const [allCompanies,setallCompanies] =  useState([])
 const [userId,setUserId] =  useState(user._id)

 useEffect(() => {
  
    const fetchCompanies = async (userId) => {
      try {
        const companies = await companyService.owned(userId);
        setallCompanies(companies);
        
      } catch (error) {
        console.error("Failed to companies:", error);
      }
    };
    fetchCompanies(userId);
  
}, [userId]);

    return (
      
      <main className="mycompany-main">
  {allCompanies.length > 0 ? (
    <>
      <h1>These companies are owned by you, {user.username}</h1>
      <button><Link to="/AddCompany">Add new company</Link></button>
      {allCompanies.map((company) => (
        <div key={company._id} className="company">
          <Link to={`company/${company._id}`}><h2>{company.name}</h2></Link>  
        </div>
      ))}
    </>
  ) : (
    <>
      <h1>You don't own any companies yet, {user.username}</h1>
      <button><Link to="/AddCompany">Add your first company</Link></button>
    </>
  )}
</main>

    );
  };
  
  export default myCompanies;