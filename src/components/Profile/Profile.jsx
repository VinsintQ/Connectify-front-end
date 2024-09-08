import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";
import experienceService from "../../services/experienceService";
import educationService from "../../services/educationService";
import projectService from "../../services/projectService";
import { useParams } from "react-router-dom";

const Profile = ({user})=>{
const [projects, setProjects] = useState([]);    
const [experiences, setExperiences] = useState([]);
const [profile, setProfile] = useState();
const [educations, setEducations] = useState([]);
//get user profile
useEffect(()=>{
    const fetchProfile = async()=>{
        const profile = await profileService.show();
        setProfile(profile);
    }
    fetchProfile();
}   ,[user]);

//get user experiences
useEffect(()=>{
    const fetchexp = async()=>{
        const exp = await experienceService.index({user});
        setExperiences(exp.exp);
    }
    fetchexp();
}   ,[user]);

useEffect(()=>{
    const fetchedu = async()=>{
        const edu = await educationService.show();
        setEducations(edu.education);
    }
    fetchedu();
},[user]);

useEffect(()=>{
    const fetchpro = async()=>{
        const pro = await projectService.show({user});
        setProjects(pro);
    }
    fetchpro();
},[user]);
    return(
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <p>Name : {profile.name}</p>
                    <p>Email : {profile.email}</p>
                    <p>Username : {profile.username}</p>
                    <p>PhoneNum : {profile.phone}</p>
                    <p>Occupation : {profile.occupation}</p>
                    <p>Followers : {profile.Followers?.length}</p>
                </div>
            )}
            <h3>Experiences</h3>
            <button >
              <Link to="/addExp">Add</Link>
            </button>
            {experiences.map((exp,index) => ( <div key={exp._id}>
                <br />
                <div key={exp._id}>
                    <Link to={`/experience/${exp._id}`}><p>Position : {exp.position} Company : {exp.company}</p></Link>
                 
                 
            </div> 
              
            </div>
            ))}   

            <h3>Education</h3>  
            <button >
              <Link to="/addEducation">Add</Link>
            </button>
            {educations.map((edu) => ( <div key={edu._id}>
                <br />
                <div key={edu._id}>
                 <p>Degree : {edu.Degree}</p>
                 
                 <p>School : {edu.School}</p>
                 <p>Start Date : {new Date(edu.StartDate).toLocaleDateString()}</p>
                 <p>End Date : {edu.EndDate ? new Date(edu.EndDate).toLocaleDateString() : 'Present'}</p>
                 
              </div></div>))}   
            <h3>Projects</h3>
            <button >
              <Link to="/addproject">Add</Link>
            </button>
            {projects?.map((pro) => ( <div key={pro._id}>
                <br />
                <div key={pro?._id}>
                 <p>Project Name : {pro?.name}</p>
                 <p>Project Description : {pro?.description}</p>
                 <p>Tools : {pro?.tools?.map((tool)=>(
                    <li key={tool._id}>{tool.tool}</li>

                 ))}</p>
                 
                 
              </div></div>))}
        </div>
    )
}

export default Profile;