import "./Search.css";
import { useState, useEffect } from "react";
import userServices from "../../services/userServices";
import { Link } from "react-router-dom";
import followersServices from "../../services/followers";

const Search = ({ users, user, userData }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [randomNumArr, setRandomNumArr] = useState([]);
  const [sameOccupation, setSameOccupation] = useState([]);

  useEffect(() => {
    if (userData && users.length > 0 && userData.occupation) {
      const filterd = users.filter((u) => u._id !== user._id);
      const same = filterd.filter(
        (u) => u.occupation.toLowerCase() === userData.occupation.toLowerCase()
      );

      setSameOccupation(same);
    }
  }, [userData, users]);

  useEffect(() => {
    if (sameOccupation.length > 0) {
      const newRandomNumArr = [];
      while (newRandomNumArr.length < Math.min(sameOccupation.length, 5)) {
        const randomNum = Math.floor(Math.random() * sameOccupation.length);
        if (!newRandomNumArr.includes(randomNum)) {
          newRandomNumArr.push(randomNum);
        }
      }

      setRandomNumArr(newRandomNumArr);
    }
  }, [sameOccupation]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const data = await followersServices.index(user._id);
        setFollowers(data.map((follower) => follower._id));
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };
    fetchFollowers();
  }, [user]);

  const handleAddUser = async (username) => {
    try {
      await followersServices.AddFollower(username, user._id, user.image);
      setFollowers((prevFollowers) => [...prevFollowers, username]);
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("An error occurred while adding the friend.");
    }
  };

  const handleUnfollow = async (followerId) => {
    try {
      await followersServices.DeleteFollower(user._id, followerId);
      setFollowers((prevFollowers) =>
        prevFollowers.filter((id) => id !== followerId)
      );
    } catch (error) {
      console.error("Failed to unfollow user:", error);
      alert("An error occurred while unfollowing the user.");
    }
  };

  const handleChange = (event) => {
    const search = event.target.value.toLowerCase();
    if (search) {
      const filtered = users.filter((user) =>
        user.username?.toLowerCase().includes(search)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          name="search"
          id="search"
          className="search-input"
          placeholder="Search users..."
          onChange={handleChange}
        />
      </div>
      <h2>People with Same Occupation</h2>

      <ul className="user-list">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user._id} className="user-item">
              <div className="user-info">
                {followers.includes(user._id) ? (
                  <button
                    className="follow-button"
                    onClick={() => handleUnfollow(user._id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="follow-button"
                    onClick={() => {
                      handleAddUser(user.username);
                      setFollowers((prevFollowers) => [
                        ...prevFollowers,
                        user._id,
                      ]);
                    }}
                  >
                    Follow
                  </button>
                )}

                <Link to={`/profile/${user._id}`}>
                  <span className="username">{user.username}</span>
                </Link>

                <span> {user.occupation}</span>
              </div>
            </li>
          ))
        ) : sameOccupation && sameOccupation.length < 5 ? (
          sameOccupation.map((occupationUser) => {
            if (occupationUser._id === user._id) return null;

            return (
              <li key={occupationUser._id} className="user-item">
                <div className="user-info">
                  {followers.includes(occupationUser._id) ? (
                    <button
                      className="follow-button"
                      onClick={() => handleUnfollow(occupationUser._id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="follow-button"
                      onClick={() => {
                        handleAddUser(occupationUser.username);
                        setFollowers((prevFollowers) => [
                          ...prevFollowers,
                          occupationUser._id,
                        ]);
                      }}
                    >
                      Follow
                    </button>
                  )}
                  <span className="username">
                    <Link
                      to={`/profile/${occupationUser._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {occupationUser.username}
                    </Link>
                  </span>
                  <span> {occupationUser.occupation}</span>
                </div>
              </li>
            );
          })
        ) : randomNumArr && sameOccupation ? (
          randomNumArr.map((num) => {
            const userWithSameOccupation = sameOccupation[num];
            if (
              !userWithSameOccupation ||
              userWithSameOccupation._id === user._id
            )
              return null;

            return (
              <li key={userWithSameOccupation._id} className="user-item">
                <div className="user-info">
                  {followers.includes(userWithSameOccupation._id) ? (
                    <button
                      className="follow-button"
                      onClick={() => handleUnfollow(userWithSameOccupation._id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="follow-button"
                      onClick={() => {
                        handleAddUser(userWithSameOccupation.username);
                        setFollowers((prevFollowers) => [
                          ...prevFollowers,
                          userWithSameOccupation._id,
                        ]);
                      }}
                    >
                      Follow
                    </button>
                  )}
                  <span className="username">
                    <Link
                      to={`/profile/${userWithSameOccupation._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {userWithSameOccupation.username}
                    </Link>
                  </span>
                  <span> {userWithSameOccupation.occupation}</span>
                </div>
              </li>
            );
          })
        ) : (
          <li>No users found</li>
        )}
      </ul>
    </div>
  );
};

export default Search;
