import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./ChatPage.css";
import userServices from "../../services/userServices";
import followersServices from "../../services/followers";
import conversationServices from "../../services/conversationServices";
import messagesServices from "../../services/messagesServices";
import Conversation from "../ConversationComp/Conversation";
import Messages from "../Message/Message";

const ChatPage = ({ user, userData, setuserData }) => {
  const [conversation, setConversation] = useState([]);
  const [Chat, setChat] = useState(null);
  const [ChatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [Arrmessage, setArrMessage] = useState(null);
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [temp, setTemp] = useState(0);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:3000");

    socket.current.on("getData", (data) => {
      setArrMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.emit("addUser", user.id);

    socket.current.on("getUsers", (users) => {
      setUsers(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (Arrmessage && Chat?.members.includes(Arrmessage.sender)) {
      setChatMessages((prev) => [...prev, Arrmessage]);
    }
  }, [Arrmessage, Chat]);

  useEffect(() => {
    const getConv = async () => {
      try {
        const data = await conversationServices.index(user.id);
        setConversation(data);
      } catch (error) {
        console.error("Failed to get conversations:", error);
      }
    };
    getConv();
  }, [user.id]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const data = await followersServices.index(user.id);
      setFollowers(data);
    };
    fetchFollowers();
  }, [user.id]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (Chat) {
        try {
          const messages = await messagesServices.showMassages(Chat._id);
          setChatMessages(messages);
          setTemp("");
        } catch (error) {
          console.error("Failed to get messages:", error);
        }
      }
    };
    fetchMessages();
  }, [Chat, temp]);

  const handleClick = async (event) => {
    event.preventDefault();

    const messageObj = {
      conversationId: Chat._id,
      sender: user.id,
      text: message,
    };

    const receiverId = Chat.members.find((member) => member !== user.id);

    if (socket.current) {
      socket.current.emit("sendData", {
        senderId: user.id,
        receiverId,
        text: message,
      });
    }

    try {
      const newMessage = await messagesServices.create(messageObj);
      setChatMessages((prev) => [...prev, newMessage]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleChange = (event) => {
    const search = event.target.value.toLowerCase();
  };

  if (!userData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="chat">
      <div className="chatList">
        <div className="chatListWrapper">
          <input
            placeholder="Search For Friend"
            type="text"
            className="SearchInput"
            onChange={handleChange}
          />
          {conversation.map((conv, index) => (
            <div key={index} onClick={() => setChat(conv)}>
              <Conversation conversation={conv} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {Chat ? (
            <>
              <div className="chatBoxTop">
                <div className="chatBoxTop">
                  {ChatMessages?.map((msg, index) => (
                    <Messages
                      key={index}
                      ChatMessages={msg}
                      AllChatMessages={ChatMessages}
                      setChatMessages={setChatMessages}
                      currentUser={user}
                      temp={setTemp}
                    />
                  ))}
                </div>
              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatText"
                  placeholder="Write something..."
                  onChange={(event) => setMessage(event.target.value)}
                  value={message}
                ></textarea>
                <button className="sendButton" onClick={handleClick}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className="noChatText">
              Click on one of your friends to start a chat
            </span>
          )}
        </div>
      </div>
      <div className="chatStatus">
        <div className="chatStatusWrapper">
          <div className="chatOnline">
            {userData.Friends.map((friend, index) => (
              <div key={index} className="chatOnlineFriends">
                <div className="chatOnlineImgContainer">
                  <img className="chatOnlineImg" src="icon.png" alt="" />
                  <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{friend.username}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
