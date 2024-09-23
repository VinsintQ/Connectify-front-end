import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";
import experienceService from "../../services/experienceService";
import educationService from "../../services/educationService";
import projectService from "../../services/projectService";
import userServices from "../../services/userServices";
import { useParams } from "react-router-dom";
import "./otherProfile.css";

const Profile = ({ user }) => {
  const { userId } = useParams();
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [profile, setProfile] = useState();
  const [educations, setEducations] = useState([]);

  const educationsToShow = showAllEdu ? educations : educations?.slice(0, 2);
  const projectsToShow = showAllProjects ? projects : projects?.slice(0, 2);
  const experiencesToShow = showAll ? experiences : experiences?.slice(0, 2);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await userServices.show(userId);
      setProfile(profile);
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const fetchexp = async () => {
      const exp = await experienceService.indexc(userId);
      setExperiences(exp.exp);
    };
    fetchexp();
  }, [userId]);

  useEffect(() => {
    const fetchedu = async () => {
      const edu = await educationService.indexc(userId);
      setEducations(edu.education);
    };
    fetchedu();
  }, [userId]);

  useEffect(() => {
    const fetchpro = async () => {
      const pro = await projectService.indexc(userId);
      setProjects(pro);
    };
    fetchpro();
  }, [userId]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {profile && (
        <div className="profile-header">
          <img src={profile?.image} alt="profile image" />
          <div>
            <p>Name : {profile.name}</p>
            <p>Email : {profile.email}</p>
            <p>Username : {profile.username}</p>
            <p>PhoneNum : {profile.phone}</p>
            <p>Occupation : {profile.occupation}</p>
            {profile.isPrivate === "false" ? (
              <Link to={`/profile/followers/${profile._id}`}>
                <span>Followers: {profile.Followers?.length}</span>
              </Link>
            ) : (
              <p>Followers : {profile.Followers?.length}</p>
            )}
          </div>
        </div>
      )}

      <div className="sections-container">
        <div className="section">
          <h3>Experiences</h3>
          {experiencesToShow.map((exp, index) => (
            <div key={exp._id}>
              <br />
              <div>
                <Link to={`/experience/${exp._id}`}>
                  <p>
                    Position: {exp.position} Company: {exp.company}
                  </p>
                </Link>
              </div>
            </div>
          ))}
          {experiences.length > 2 && (
            <button onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        <div className="section">
          <h3>Education</h3>
          {educationsToShow.map((edu) => (
            <div key={edu._id}>
              <br />
              <div>
                <Link to={`/education/${edu._id}`}>
                  <p>School : {edu?.School}</p>
                </Link>
              </div>
            </div>
          ))}
          {educations.length > 2 && (
            <button onClick={() => setShowAllEdu(!showAllEdu)}>
              {showAllEdu ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        <div className="section">
          <h3>Projects</h3>
          {projectsToShow?.map((pro) => (
            <div key={pro._id}>
              <br />
              <div>
                <Link to={`/project/${pro._id}`}>
                  <p>Project Name: {pro?.name}</p>
                </Link>
              </div>
            </div>
          ))}
          {projects.length > 2 && (
            <button onClick={() => setShowAllProjects(!showAllProjects)}>
              {showAllProjects ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
