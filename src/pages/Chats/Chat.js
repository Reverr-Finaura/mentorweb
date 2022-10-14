import React, { useEffect, useState } from "react";
import ChatComponent from "../../components/chat/ChatComponent";
import { getMentorClients } from "../../firebase/firebase";
import styles from "./Chat.module.css";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [mentorClients, setMentorClients] = useState([]);

  const fetchClients = async () => {
    let clients = await getMentorClients("jatin.dsquare@gmail.com");
    setMentorClients(clients);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <button
        className={styles["chat-button"]}
        onClick={() => setShowChat(!showChat)}
      >
        Chat
      </button>

      {showChat && (
        <ChatComponent
          clients={mentorClients}
          onBlur={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default Chat;
