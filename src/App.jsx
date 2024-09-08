import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "./services/authService";
import userServices from "./services/userServices";
import ChatPage from "./components/ChatPage/ChatPage";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import Search from "./components/Search/Search";
import Profile from "./components/Profile/Profile";
import ExpForm from "./components/AddExpForm/ExperienceForm";
function App() {
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

  return (
    <>
      <NavBar user={user} handleSignout={handleSignout} />

      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/addExp" element={<ExpForm user={user}/>} />
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
          <Route path="/" element={<Landing />} />
        )}
        <Route path="/signup" element={<SignupForm setUser={setUser} />} />
        <Route path="/signin" element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
