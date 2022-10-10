import React, { useEffect, useState } from "react";
import ChatComponent from "../components/chat/ChatComponent";
import { getMentorClients } from "../firebase/firebase";
import styles from "./Chat.module.css";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [mentorClients, setMentorClients] = useState([]);

  const fetchClients = async () => {
    let clients = await getMentorClients();
    setMentorClients(clients);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // const chatMain = document.getElementsByClassName("main__chat")[0];

  window.addEventListener("onFocus", () => {
    setShowChat(false);
  });

  return (
    <>
      {/* <div className={styles["main"]} onFocus={() => setShowChat(false)}>
        Chat
      </div> */}
      <button
        className={styles["chat-button"]}
        onClick={() => setShowChat(!showChat)}
      >
        Chat
      </button>

      {showChat && <ChatComponent clients={mentorClients} />}
    </>
  );
};

export default Chat;
