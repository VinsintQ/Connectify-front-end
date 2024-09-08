
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import experienceService from "../../services/experienceService";
const ExperienceDetails = ({user}) => {
    
  const { expId } = useParams();
  const [experience, setExperience] = useState();

  useEffect(() => {
    async function getExp() {
      const expData = await experienceService.show({expId,user});
      setExperience(expData);
    }
    getExp();
  }, [expId]);

  if (!experience) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }
    return (
        <div>
            <h3>Experience Details</h3>
            <p>Position : {experience.position}</p>
            <p>Company : {experience.company}</p>
            <p>Start Date : {new Date(experience.StartDate).toLocaleDateString()}</p>
            <p>End Date : {experience.EndDate ? new Date(experience.EndDate).toLocaleDateString() : "Present"}</p>
            {experience.description && <p>Description : {experience.description}</p>}
            <button >

              <Link to={`/experience/${experience._id}/update`}>Edit</Link>
            </button>
        </div>
    )
}

export default ExperienceDetails