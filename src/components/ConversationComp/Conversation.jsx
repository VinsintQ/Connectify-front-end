import { useEffect, useState } from "react";
import userServices from "../../services/userServices";
import conversationServices from "../../services/conversationServices";
const Conversation = ({
  conversation,
  currentUser,
  onlineUsers,
  allConversations,
  setAllConversations,
}) => {
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

  const handelDelete = async () => {
    await conversationServices.Delete(conversation._id);
    setAllConversations(
      allConversations.filter((conv) => conv._id !== conversation._id)
    );
  };

  return (
    <div className="conversation">
      <img src="icon.png" alt="" />
      {isOnline && <span className="chatOnlineBadge"></span>}
      <span className="friendName">{ConvUser?.username}</span>

      <div class="dropdown">
        <button>⫶</button>
        <div class="dropdown-content">
          <p onClick={handelDelete}>Delete Chat</p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
