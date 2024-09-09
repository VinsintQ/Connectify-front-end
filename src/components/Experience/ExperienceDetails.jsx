
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import experienceService from "../../services/experienceService";
const ExperienceDetails = ({user}) => {
    
  const { expId } = useParams();
  const [experience, setExperience] = useState();

  const deleteExp = async () => {
    await experienceService.deleter(expId,user._id);
    window.location.replace("/profile");
  }

  useEffect(() => {
    async function getExp() {
      const expData = await experienceService.show({user,expId});
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
            <button onClick={deleteExp}>delete</button>
        </div>
    )
}

export default ExperienceDetails