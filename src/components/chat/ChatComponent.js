import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatComponent.module.css";
import add from "../../assets/img/add.png";
import options from "../../assets/img/options.png";
import attachment from "../../assets/img/attachment.png";
import emoji from "../../assets/img/emoji.png";
import { updateMsgsInDatabase } from "../../firebase/firebase";
import EmojiPicker from "emoji-picker-react";

const ChatComponent = ({ clients }) => {
  const [selectedClient, setSelectedClient] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const msgEndRef = useRef(null);

  const [newMsg, setNewMsg] = useState([]);

  const sendMsg = async () => {
    const curClientData = {
      ...selectedClient,
      messages: [
        ...selectedClient.messages,
        {
          createdAt: new Date().toDateString(),
          msg: newMsg,
          sendBy: "jatin.dsquare@gmail.com",
        },
      ],
    };

    setSelectedClient(curClientData);
    await updateMsgsInDatabase(selectedClient.uid, curClientData);
    setNewMsg("");
  };

  const onEmojiClickHandler = (emojiObj) => {
    setNewMsg((prevInput) => prevInput + emojiObj.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    msgEndRef.current?.scrollIntoView();
  }, [newMsg, selectedClient]);

  console.log(selectedClient);

  return (
    <>
      <div className={styles.chat}>
        <div className={styles["users-section"]}>
          <div className={styles["top-bar-users"]}>
            <img
              src="https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg"
              alt="profile"
              className={styles["mentor-profile"]}
            />
          </div>
          <div className={styles["user-profiles"]}>
            {clients.map((client) => (
              <div
                onClick={() => {
                  setSelectedClient(client);
                }}
                key={client.client_Name}
              >
                {client.client_Name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles["chat-section"]}>
          <div className={styles["top-bar"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {selectedClient.length === 0 ? null : (
                <img
                  src="https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg"
                  alt="profile"
                  className={styles.profile}
                />
              )}
              {selectedClient?.messages ? (
                <h3>{selectedClient.client_Name}</h3>
              ) : null}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={add} alt="add" className={styles.add} />
              <img src={options} alt="add" className={styles.options} />
            </div>
          </div>

          <div className={styles["chat-area"]} id="chat-area">
            {selectedClient?.messages
              ? selectedClient.messages.map((curMsg) => (
                  <h4
                    className={
                      curMsg.sendBy == "jatin.dsquare@gmail.com"
                        ? styles["mentor-h4"]
                        : styles["client-h4"]
                    }
                  >
                    {curMsg?.msg}
                  </h4>
                ))
              : null}
            <div ref={msgEndRef} />
          </div>

          <div className={styles["bottom-bar"]}>
            <img
              src={attachment}
              alt="attachment"
              className={styles.attachment}
            />
            <img
              src={emoji}
              alt="emoji"
              className={styles.emoji}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <input
              value={newMsg}
              type="text"
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  sendMsg();
                }
              }}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Message"
              className={styles["message-input"]}
              disabled={selectedClient.length === 0 ? true : false}
            />
          </div>
        </div>
      </div>
      {showEmojiPicker && selectedClient.length !== 0 && (
        <div className={styles["emoji-picker"]}>
          <EmojiPicker onEmojiClick={onEmojiClickHandler} width={300} />
        </div>
      )}
    </>
  );
};

export default ChatComponent;
