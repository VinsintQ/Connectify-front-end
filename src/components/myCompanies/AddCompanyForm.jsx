

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import companyService from "../../services/companyService";

const AddCompanyForm = ({ user }) => {
  const navigate = useNavigate();

  const [compData, setCompData] = useState({
    name: "",
    industry: "",
    companySize: "",
  });

  const handleAddCompany = async (compData) => {
    const newCompany = await companyService.create({ formData: compData });
    navigate(`/Mycompany/company/${newCompany._id}`);
  };

  const handleChange = (e) => {
    setCompData({ ...compData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleAddCompany(compData);
  };

  // Check if the form has valid, non-empty values
  const isFormValid =
    compData.name.trim() !== "" &&
    compData.industry.trim() !== "" &&
    compData.companySize.trim() !== "";

  return (
    <main>
      <h1>New Company</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            value={compData.name}
            name="name"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="industry">Industry: </label>
          <input
            type="text"
            id="industry"
            value={compData.industry}
            name="industry"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="companySize">Company Size: </label>
          <select
            id="companySize"
            value={compData.companySize}
            name="companySize"
            onChange={handleChange}
          >
            <option value="">Select size</option>
            <option value="0-1">0-1</option>
            <option value="2-49">2-49</option>
            <option value="50-500">50-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div>
          <button type="submit" disabled={!isFormValid}>
            Add Company
          </button>
        </div>
      </form>
    </main>
  );
};

export default AddCompanyForm;
