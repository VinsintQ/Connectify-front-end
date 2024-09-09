import "./Search.css";
import { useState, useEffect } from "react";
import userServices from "../../services/userServices";
import { Link } from "react-router-dom";

import followersServices from "../../services/followers";

const Search = ({ randomNumArr, users, user, sameOccupation }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followers, setFollowers] = useState([]);

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
  }, [user._id]);

  const handleAddUser = async (username) => {
    try {
      await followersServices.AddFollower(username, user._id);
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
        {filteredUsers.length > 0
          ? filteredUsers.map((user) => (
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

                  <span> :{user.occupation}</span>
                </div>
              </li>
            ))
          : randomNumArr.map((num) => {
              const userFromArr = users[num];
              const occupationFromArr = sameOccupation[num];

              if (userFromArr && occupationFromArr) {
                return (
                  <li key={occupationFromArr._id} className="user-item">
                    <div className="user-info">
                      {followers.includes(occupationFromArr._id) ? (
                        <button
                          className="follow-button"
                          onClick={() => handleUnfollow(occupationFromArr._id)}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="follow-button"
                          onClick={() => {
                            handleAddUser(occupationFromArr.username);
                            setFollowers((prevFollowers) => [
                              ...prevFollowers,
                              occupationFromArr._id,
                            ]);
                          }}
                        >
                          Follow
                        </button>
                      )}
                      <span className="username">
                        <Link to={`/profile/${occupationFromArr._id}`}>
                          {occupationFromArr.username}
                        </Link>
                      </span>
                      <span> :{occupationFromArr.occupation}</span>
                    </div>
                  </li>
                );
              }

              return null;
            })}
      </ul>
    </div>
  );
};

export default Search;
