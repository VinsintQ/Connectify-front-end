import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profileService from "../../services/profileService";
import experienceService from "../../services/experienceService";
import educationService from "../../services/educationService";
import projectService from "../../services/projectService";
import { useParams } from "react-router-dom";
import "./Profile.css";
const Profile = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showAllEdu, setShowAllEdu] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [profile, setProfile] = useState();
  const [educations, setEducations] = useState([]);
  const projectsToShow = showAllProjects ? projects : projects.slice(0, 2);
  const educationsToShow = showAllEdu ? educations : educations.slice(0, 2);
  const experiencesToShow = showAll ? experiences : experiences.slice(0, 2);
  //get user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await profileService.show();
      setProfile(profile);
    };
    fetchProfile();
  }, [user]);

  //get user experiences
  useEffect(() => {
    const fetchexp = async () => {
      const exp = await experienceService.index({ user });
      setExperiences(exp.exp);
    };
    fetchexp();
  }, [user]);
  //get user education
  useEffect(() => {
    const fetchedu = async () => {
      const edu = await educationService.index();
      setEducations(edu.education);
    };
    fetchedu();
  }, [user]);

  useEffect(() => {
    const fetchpro = async () => {
      const pro = await projectService.index({ user });
      setProjects(pro);
    };
    fetchpro();
  }, [user]);
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <Link to={`/profile/update/${user._id}`}>
        <span className="the-lord">edit profile details</span>
      </Link>
      {profile && (
        <div className="profile-header">
          <img src={profile?.image} alt="Profile image" />
          <div>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Username: {profile.username}</p>
            <p>PhoneNum: {profile.phone}</p>
            <p>Occupation: {profile.occupation}</p>
            <Link to={`/profile/followers`}>
              <span>Followers: {profile.Followers?.length}</span>
            </Link>
          </div>
        </div>
      )}

      <div className="sections-container">
        <div className="section">
          <h3>Experiences</h3>
          {/* <button> */}
            <Link to="/addExp">
            <span className="a">Add</span>
            </Link>
          {/* </button> */}
          {experiencesToShow.map((exp) => (
            <div key={exp._id}>
              <Link to={`/experience/${exp._id}`}>
                <p>
                  Position: {exp.position} Company: {exp.company}
                </p>
              </Link>
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
          {/* <button> */}
            <Link to="/addEducation" className="a">
              <span className="a">Add</span>
            </Link>
          {/* </button> */}
          {educationsToShow.map((edu) => (
            <div key={edu._id}>
              <Link to={`/education/${edu._id}`}>
                <p>School: {edu.School}</p>
              </Link>
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
          {/* <button> */}
            <Link to="/addproject">
            <span className="a">Add</span>
            </Link>
          {/* </button> */}
          {projectsToShow.map((pro) => (
            <div key={pro._id}>
              <Link to={`/project/${pro._id}`}>
                <p>Project Name: {pro.name}</p>
              </Link>
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
