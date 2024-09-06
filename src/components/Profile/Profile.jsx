import { useEffect, useState } from "react";
import profileService from "../../services/profileService";

const Profile = ({user})=>{

const [profile, setProfile] = useState();
useEffect(()=>{
    const fetchProfile = async()=>{
        const profile = await profileService.show();
        setProfile(profile);
    }
    fetchProfile();
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
        </div>
    )
}

export default Profile;