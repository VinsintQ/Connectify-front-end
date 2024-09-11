import { format } from "timeago.js";
import messagesServices from "../../services/messagesServices";

const Message = ({
  ChatMessages,
  currentUser,
  setChatMessages,
  AllChatMessages,
  temp,
}) => {
  const isMine = ChatMessages.sender === currentUser._id;



  return (
    <div className={`message ${isMine ? "msgMine" : "msgOther"}`}>
      <div className="messageTop">
        <p className="messageText">
          {ChatMessages.text}

          {}
        </p>
      </div>
      <div className="messageBottom">
        <p>{format(ChatMessages.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
