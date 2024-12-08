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
  const [onlineUsers, setOnlineusers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [temp, setTemp] = useState(0);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const socket = useRef();

  useEffect(() => {
    socket.current = io(BASE_URL);

    socket.current.on("getData", (data) => {
      setArrMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    socket.current.emit("addUser", user._id);

    socket.current.on("getUsers", (users) => {
      setUsers(users);
      setOnlineusers(users.map((user) => user.userId));
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
        const data = await conversationServices.index(user._id);
        setConversation(data);
      } catch (error) {
        console.error("Failed to get conversations:", error);
      }
    };
    getConv();
  }, []);

  useEffect(() => {
    const fetchFollowers = async () => {
      const data = await followersServices.index(user._id);
      setFollowers(data);
    };
    fetchFollowers();
  }, [user._id]);

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
      sender: user._id,
      text: message,
    };

    const receiverId = Chat.members.find((member) => member !== user._id);

    if (socket.current) {
      socket.current.emit("sendData", {
        senderId: user._id,
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
    if (search) {
      const filtered = followers.filter((follower) =>
        follower.username?.toLowerCase().includes(search)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  };

  const handleAddtoConvlist = async (follower) => {
    const existingConversation = conversation.find((conv) =>
      conv.members.includes(follower._id)
    );

    if (!existingConversation) {
      try {
        const savedConversation = await conversationServices.create(
          user._id,
          follower._id
        );

        setConversation([...conversation, savedConversation]);
        setChat(savedConversation);
      } catch (error) {
        console.error("Failed to create conversation:", error);
      }
    } else {
      setChat(existingConversation);
    }

    setFilteredUsers([]);
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
          {filteredUsers.length > 0 && (
            <ul className="dropdown">
              {filteredUsers.map((follower, index) => (
                <li key={index} onClick={() => handleAddtoConvlist(follower)}>
                  {follower.username}
                </li>
              ))}
            </ul>
          )}
          {conversation.map((conv, index) => (
            <div key={index} onClick={() => setChat(conv)}>
              <Conversation
                conversation={conv}
                currentUser={user}
                onlineUsers={onlineUsers}
                allConversations={conversation}
                setAllConversations={setConversation}
                setChat={setChat}
              />
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
    </div>
  );
};

export default ChatPage;
