import React, { useEffect, useState } from "react";
import userServices from "../../services/userServices";
import followersServices from "../../services/followers";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./otherfollower.css";

const otherFollowers = ({ user }) => {
  const { profileId } = useParams();
  const [otherUserfollower, setOtheruserFollowers] = useState([]);
  console.log(otherUserfollower);
  console.log(profileId);
  // Fetch followers data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const otherUserfollowers = await userServices.show(profileId);
        setOtheruserFollowers(otherUserfollowers.Followers);
      } catch (error) {
        console.error("Failed to fetch followers:", error);
      }
    };
    fetchProfile();
  }, [profileId]);

  const handleUnfollow = async (followerId) => {
    try {
      await followersServices.DeleteFollower(profileId, followerId);
      setOtheruserFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower._id !== followerId)
      );
    } catch (error) {
      console.error("Failed to unfollow user:", error);
      alert("An error occurred while unfollowing the user.");
    }
  };

  return (
    <div className="otherfollwer">
      {otherUserfollower?.map((follower) => (
        <div className="userinformation" key={follower._id}>
          <Link to={`/profile/${follower._id}`}>
            <img
              className="prof-image"
              src={follower.image}
              alt={`${follower.username}'s profile`}
            />
            <h3>{follower?.username}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default otherFollowers;
