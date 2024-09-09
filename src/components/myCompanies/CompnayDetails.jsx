import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

;
import companyService from "../../services/companyService";

const CompanyDetails = ({ user }) => {
  const navigate = useNavigate();
  const { compId } = useParams();
 const [company, setCompany] = useState();

  

  

  




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
    <div>
      <h3>Company Details</h3>
      <p>Name : {company.name}</p>
      <p>Indusrty : {company.industry}</p>
      

      
    </div>
  );
};

export default CompanyDetails;
