import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "./services/authService";
import userServices from "./services/userServices";
import ChatPage from "./components/ChatPage/ChatPage";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";

import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import MyCompanies from "./components/myCompanies/myCompanies";
import experienceService from "./services/experienceService";
import ExpForm from "./components/Experience/ExperienceForm";
import ProjectForm from "./components/Projects/ProjectForm";
import projectService from "./services/projectService";
import EducationForm from "./components/Education/educationForm";
import OtherProfile from "./components/otherProfile/otherProfile";
import educationService from "./services/educationService";
import ExperienceDetails from "./components/Experience/ExperienceDetails";
import ProjectDetails from "./components/Projects/PeojectDetails";
import EducationDetails from "./components/Education/educationDetails";
import "bootstrap/dist/js/bootstrap.bundle.min";

import PostForm from "./components/Posts/PostForm";
import PostDetails from "./components/Posts/postDetail";
import CompanyDetails from "./components/myCompanies/CompnayDetails";
import AddCompanyForm from "./components/myCompanies/AddCompanyForm";
import postService from "./services/postService";

import SignForm from "./components/SigninForm/signForm";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState(authService.getUser());
  const [randomNumArr, setRandomNumArr] = useState([]);
  const [users, setUsers] = useState([]);
  const [sameOccupation, setSameOccupation] = useState([]);
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    if (user && user._id) {
      const fetchUser = async () => {
        try {
          const userData = await userServices.show(user._id);
          setuserData(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUser();
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await userServices.index();
      setUsers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (userData && users.length > 0) {
      const same = users.filter((u) => u.occupation === userData.occupation);

      setSameOccupation(same);
    }
  }, [userData, users]);

  useEffect(() => {
    if (sameOccupation.length > 0) {
      const newRandomNumArr = [];
      while (newRandomNumArr.length < 5) {
        const randomNum = Math.floor(Math.random() * sameOccupation.length);
        if (!newRandomNumArr.includes(randomNum)) {
          newRandomNumArr.push(randomNum);
        }
      }
      setRandomNumArr(newRandomNumArr);
    }
  }, [sameOccupation]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  const handleAddExp = async (expData) => {
    const newExp = await experienceService.add({ formData: expData, user });
    navigate("/profile");
  };

  const handleAddPro = async (proData) => {
    const newPro = await projectService.add({ formData: proData, user });
    navigate("/profile");
  };
  const handleUpdateExp = async ({ expId, expData }) => {
    const updated = await experienceService.update({
      expId,
      formData: expData,
      user,
    });
    navigate(`/experience/${expId}`);
  };

  const handleUpdatePost = async ({ postId, PostData }) => {
    console.log(PostData);
    const updated = await postService.update({
      postId,
      PostData,
      user,
    });
    navigate(`/post/${postId}`);
  };

  const handleUpdatePro = async ({ proId, proData }) => {
    const updated = await projectService.update({
      proId,
      formData: proData,
      user,
    });
    navigate(`/project/${proId}`);
  };
  const handleUpdateEducation = async ({ eduId, educationData }) => {
    const updated = await educationService.update({
      eduId,
      formData: educationData,
      user,
    });
    navigate(`/education/${eduId}`);
  };
  return (
    <>
      {user ? <NavBar user={user} handleSignout={handleSignout} /> : <></>}
      <div className="main-content">
        <Routes>
          {user ? (
            <>
              {/* view company Details*/}
              <Route
                path="Mycompany/company/:compId"
                element={<CompanyDetails user={user} />}
              />
              <Route path="/Mycompany" element={<MyCompanies user={user} />} />
              <Route
                path="/AddCompany"
                element={<AddCompanyForm user={user} />}
              />
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />

              <Route
                path="/profile/:userId"
                element={<OtherProfile user={user} />}
              />

              {/*view project details  */}

              <Route
                path="/project/:proId"
                element={<ProjectDetails user={user} />}
              />
              <Route
                path="/addproject"
                element={
                  <ProjectForm user={user} handleAddPro={handleAddPro} />
                }
              />
              <Route
                path="/project/:proId/update"
                element={
                  <ProjectForm user={user} handleUpdatePro={handleUpdatePro} />
                }
              />
              <Route
                path="/addExp"
                element={<ExpForm user={user} handleAddExp={handleAddExp} />}
              />
              {/*Add post*/}
              <Route path="/addPost" element={<PostForm user={user} />} />
              {/* view experience Details*/}
              <Route
                path="/experience/:expId"
                element={<ExperienceDetails user={user} />}
              />
              {/* update experience*/}
              <Route
                path="/experience/:expId/update"
                element={
                  <ExpForm user={user} handleUpdateExp={handleUpdateExp} />
                }
              />
              <Route
                path="/addEducation"
                element={<EducationForm user={user} />}
              />
              {/* view education details */}
              <Route
                path="/education/:eduId"
                element={<EducationDetails user={user} />}
              />
              {/* update education */}
              <Route
                path="/education/:eduId/update"
                element={
                  <EducationForm
                    user={user}
                    handleUpdateEducation={handleUpdateEducation}
                  />
                }
              />

              <Route
                path="/post/:postId"
                element={<PostDetails user={user} />}
              />
              {/* update education */}
              <Route
                path="/post/:postId/update"
                element={
                  <PostForm user={user} handleUpdatePost={handleUpdatePost} />
                }
              />
              <Route
                path="/chat"
                element={
                  <ChatPage
                    user={user}
                    userData={userData}
                    setuserData={setuserData}
                  />
                }
              />
              <Route
                path="/search"
                element={
                  <Search
                    randomNumArr={randomNumArr}
                    users={users}
                    user={user}
                    sameOccupation={sameOccupation}
                    userData={userData}
                  />
                }
              />
            </>
          ) : (
            <Route path="/" element={<SignForm setUser={setUser} />} />
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
