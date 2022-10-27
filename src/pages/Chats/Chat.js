import React, { useState } from "react";
import ChatComponent from "../../components/chat/ChatComponent";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Chat.module.css";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <Navbar />
      <button
        className={styles["chat-button"]}
        onClick={() => {
          setShowChat(!showChat);
        }}
      >
        Chat
      </button>

      {showChat && <ChatComponent />}
    </>
  );
};

export default Chat;
