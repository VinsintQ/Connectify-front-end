import { format } from "timeago.js";
import messagesServices from "../../services/messagesServices";

const Message = ({
  ChatMessages,
  currentUser,
  setChatMessages,
  AllChatMessages,
  temp,
}) => {
  const isMine = ChatMessages.sender === currentUser.id;

  // const handelDeleteForMe = async () => {
  //   await messagesServices.DeleteMasseges(ChatMessages._id);
  // };

  // const handelDelete = async () => {
  //   await messagesServices.DeleteMasseges(ChatMessages._id);
  //   setChatMessages(
  //     AllChatMessages.filter((msg) => msg._id !== ChatMessages._id)
  //   );
  //   temp(Date.now());
  // };

  return (
    <div className={`message ${isMine ? "msgMine" : "msgOther"}`}>
      <div className="messageTop">
        <p className="messageText">
          {ChatMessages.text}

          {/* {isMine ? (
            <div class="dropdown">
              <button>⫶</button>
              <div class="dropdown-content">
                <p onClick={handelDeleteForMe}>Delete For Me</p>
                <p onClick={handelDelete}>Delete For Every One</p>
              </div>
            </div>
          ) : (
            ""
          )} */}
        </p>
      </div>
      <div className="messageBottom">
        <p>{format(ChatMessages.createdAt)}</p>
      </div>
    </div>
  );
};

export default Message;
