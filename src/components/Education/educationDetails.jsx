import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import educationService from "../../services/educationService";
const educationDetails =({user})=> {

    const { eduId } = useParams();
    const [education, setEducation] = useState();

    useEffect(() => {
        async function getEdu() {
            const eduData = await educationService.show({user,eduId});
            setEducation(eduData);
        }
        getEdu();
    }
    , [eduId]);

    if (!education) {
        return (
          <main>
            <h3>Loading...</h3>
          </main>
        );
      }


    return (<div>
         <h3>Education Details</h3>
        <p>School : {education.School}</p>
        <p>Degree : {education.Degree}</p>
        <p>Start Date: {new Date(education.StartDate).toLocaleDateString()}</p>
        <p>End Date: {education.EndDate ? new Date(education.EndDate).toLocaleDateString() : 'Present'}</p>



        
    </div>);








}

export default educationDetails;