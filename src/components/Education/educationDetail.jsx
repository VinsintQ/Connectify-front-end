
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import experienceService from "../../services/experienceService";
import educationService from "../../services/educationService";
const EducationDetails = ({user}) => {
    
  const { educationId } = useParams();
  const [education, setEducation] = useState();
 const [userId, setUserId] = useState(user._id);
  useEffect(() => {
    async function getEducation() {
      const educationData = await educationService.index(userId,educationId);
      setEducation(educationData);
    }
    getEducation();
  }, [educationId]);

  if (!education) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }
    return (
        <div>
            <h3>Education Details</h3>
            <p>School : {education.School}</p>
            <p>Degree : {education.Degree}</p>
            <p>Start Date : {new Date(education.StartDate).toLocaleDateString()}</p>
            <p>End Date : {education.EndDate ? new Date(education.EndDate).toLocaleDateString() : "Present"}</p>

            <button >

              <Link to={`/education/${education._id}/update`}>Edit</Link>
            </button>
        </div>
    )
}

export default EducationDetails