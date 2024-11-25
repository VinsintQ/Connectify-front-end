import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./CompanyDetails.css";

import companyService from "../../services/companyService";

const CompanyDetails = ({ user }) => {
  
  const { compId } = useParams();
  const [company, setCompany] = useState(compId);


  

  

  




  useEffect(() => {
    async function fetchCompany() {
        const company = await companyService.show(compId);
        setCompany(company);
        }
        fetchCompany();
        }
        , [compId]);


  if (!company) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <div className="company-details-container">
      <h3>Company Details</h3>
      <p>Name : {company.name}</p>
      <p>Industry : {company.industry}</p>
      <p>About : {company.about}</p>
  
      <div>
        <Link to={`/Mycompany/company/${company._id}/addJob`}>
          <h2 className="bt">Post a new job</h2>
        </Link> 
        <Link to={`/Mycompany/company/${company._id}/jobs`}>
          <h2 className="bt">View all jobs</h2>
        </Link>
      </div>
    </div>
  );
  
};

export default CompanyDetails;
