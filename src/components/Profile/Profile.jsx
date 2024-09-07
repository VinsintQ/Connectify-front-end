import { useEffect, useState } from "react";
import profileService from "../../services/profileService";
import experienceService from "../../services/experienceService";
const Profile = ({user})=>{
const [experiences, setExperiences] = useState([]);
const [profile, setProfile] = useState();
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
        const exp = await experienceService.show();
        setExperiences(exp.exp);
    }
    fetchexp();
}   ,[user]);

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
                    <p>Followers : {profile.Follwers}</p>
                </div>
            )}
            <h1>Experiences</h1>
            {experiences.map((exp) => ( <div key={exp._id}>
                <br />
                <div key={exp._id}>
                    <p>Role : {exp.role}</p>
                    <p>Company : {exp.company}</p>
                    <p>Start Date : {exp.startDate}</p>
                    <p>End Date : {exp.endDate}</p>
                    <p>Description : {exp.description}</p>
                </div>
            </div>
            ))}     
        </div>
    )
}

export default Profile;