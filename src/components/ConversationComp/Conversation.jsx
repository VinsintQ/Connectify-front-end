import { useEffect, useState } from "react";
import userServices from "../../services/userServices";
const Conversation = ({ conversation, currentUser }) => {
  const [ConvUser, setConvUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);
    if (friendId) {
      const getFriend = async () => {
        try {
          const friend = await userServices.show(friendId);
          setConvUser(friend);
        } catch (error) {
          console.error("Failed to get friend:", error);
        }
      };
      getFriend();
    }
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img src="icon.png" alt="" />
      <span className="friendName">{ConvUser?.username}</span>
    </div>
  );
};

export default Conversation;
