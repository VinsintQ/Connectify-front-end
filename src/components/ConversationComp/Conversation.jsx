import { useEffect, useState } from "react";
import userServices from "../../services/userServices";
import conversationServices from "../../services/conversationServices";
import { Link } from "react-router-dom";

const Conversation = ({
  conversation,
  currentUser,
  onlineUsers,
  allConversations,
  setAllConversations,
  setChat,
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

  const handleDelete = async () => {
    try {
      await conversationServices.Delete(conversation._id);
      setAllConversations(
        allConversations.filter((conv) => conv._id !== conversation._id)
      );
      setChat(null);
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  };

  return (
    <div className="conversation">
      <Link to={`/profile/${ConvUser?._id}`}>
        <img src={ConvUser?.image} alt="" />
      </Link>

      {isOnline && <span className="chatOnlineBadge"></span>}

      <Link className="no-underline" to={`/profile/${ConvUser?._id}`}>
        <span className="friendName">{ConvUser?.username}</span>
      </Link>

      <button className="deleteConvButton" onClick={handleDelete}>
        <ion-icon name="close-circle-outline"></ion-icon>
      </button>
    </div>
  );
};

export default Conversation;
