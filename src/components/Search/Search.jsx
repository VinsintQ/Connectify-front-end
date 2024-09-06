import "./Search.css";
import { useState } from "react";
import userServices from "../../services/userServices";

const Search = ({ randomNumArr, users, user, sameOccupation, userData }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleAddUser = async (username) => {
    try {
      const newUser = await userServices.create(username, user.id);
    } catch (error) {
      console.error("Failed to add user:", error);
      alert("An error occurred while adding the friend.");
    }
  };

  const handleChange = (event) => {
    const search = event.target.value.toLowerCase();
    if (search) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(search)
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
          ? filteredUsers.map((user, index) => (
              <li key={index} className="user-item">
                <div className="user-info">
                  <button
                    className="follow-button"
                    onClick={() => handleAddUser(user.username)}
                  >
                    Follow
                  </button>
                  <span className="username">{user.username}</span>
                  <span>{user.occupation}</span>
                </div>
              </li>
            ))
          : randomNumArr.map((num, index) => {
              const userFromArr = users[num];
              const occupationFromArr = sameOccupation[num];

              if (userFromArr && occupationFromArr) {
                return (
                  <li key={index} className="user-item">
                    <div className="user-info">
                      <button
                        className="follow-button"
                        onClick={() =>
                          handleAddUser(occupationFromArr.username)
                        }
                      >
                        Follow
                      </button>
                      <span className="username">
                        {occupationFromArr.username}
                      </span>
                      <span>{occupationFromArr.occupation}</span>
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
