import React, { useEffect, useState } from "react";
import ChatComponent from "../../components/chat/ChatComponent";
import Navbar from "../../components/Navbar/Navbar";
import {
  getMentorClientsDatabase,
  getMentorClientsMsgs,
  getUserFromDatabase,
} from "../../firebase/firebase";
import styles from "./Chat.module.css";

const Chat = () => {
  const [showChat, setShowChat] = useState(false);
  const [clients, setClients] = useState([]);
  const [clientMsgs, setClientMsgs] = useState([]);
  const [random, setRandom] = useState(Math.random());

  const reRenderComponent = () => setRandom(Math.random());

  const fetchClients = async () => {
    let result = await getUserFromDatabase("jatin.dsquare@gmail.com");
    if (result !== null || undefined) {
      const results = [];
      for (let i = 0; i < result.clients.length; i++) {
        let res = await getUserFromDatabase(result.clients[i]);
        results.push(res);
      }
      setClients(results);
    }
  };

  const fetchClientsMsgs = async () => {
    let results = await getMentorClientsMsgs();
    setClientMsgs(results);
  };

  useEffect(() => {
    fetchClients();
    fetchClientsMsgs();
  }, [random]);

  return (
    <>
      <Navbar />
      <button
        className={styles["chat-button"]}
        onClick={() => {
          setShowChat(!showChat);
          reRenderComponent();
        }}
      >
        Chat
      </button>

      {showChat && (
        <ChatComponent
          clientMsgs={clientMsgs}
          clients={clients}
          onBlur={() => setShowChat(false)}
        />
      )}
    </>
  );
};

export default Chat;
