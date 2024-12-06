import React, { useEffect, useState } from "react";
import profileService from "../../services/profileService";
import followersServices from "../../services/followers";
import { Link } from "react-router-dom";
import "./Followers.css";
const Followers = ({ user }) => {
  const [userFollower, setUserfollower] = useState([]);

  // Fetch followers data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userFollowers = await profileService.show();
        setUserfollower(userFollowers.Followers);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };
    fetchProfile();
  }, [user]);

  // Remove user from followers (unfollow)
  const handleUnfollow = async (followerId) => {
    try {
      await followersServices.DeleteFollower(user._id, followerId);
      setUserfollower((prevFollowers) =>
        prevFollowers.filter((follower) => follower._id !== followerId)
      );
    } catch (error) {
      console.error("Failed to unfollow user:", error);
      alert("An error occurred while unfollowing the user.");
    }
  };

  return (
    <div className="followers-container">
      {userFollower?.map((follower) => (
        <div className="followers-user-card" key={follower._id}>
          <Link to={`/profile/${follower._id}`}>
            <img
              className="followers-profile-image"
              src={follower.image}
              alt={`${follower.username}'s profile`}
            />
            <h3 className="followers-username">{follower?.username}</h3>
          </Link>

          {userFollower.some((f) => f._id === follower._id) ? (
            <button
              className="followers-unfollow-button"
              onClick={() => handleUnfollow(follower._id)}
            >
              Unfollow
            </button>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Followers;
