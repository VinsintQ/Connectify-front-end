import { useEffect, useState } from "react";
import userServices from "../../services/userServices";

const Conversation = ({ conversation, currentUser, onlineUsers }) => {
  const [ConvUser, setConvUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    if (friendId) {
      const getFriend = async () => {
        try {
          const friend = await userServices.show(friendId);
          setConvUser(friend);
          setIsOnline(onlineUsers.includes(friendId));
        } catch (error) {
          console.error("Failed to get friend:", error);
        }
      };
      getFriend();
    }
  }, [conversation, currentUser, onlineUsers]);

  return (
    <div className="conversation">
      <img src="icon.png" alt="" />
      {isOnline && <span className="chatOnlineBadge"></span>}
      <span className="friendName">{ConvUser?.username}</span>
    </div>
  );
};

export default Conversation;
