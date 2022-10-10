import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatComponent.module.css";
import add from "../../assets/img/add.png";
import options from "../../assets/img/options.png";
import attachment from "../../assets/img/attachment.png";
import emoji from "../../assets/img/emoji.png";
import { updateMsgsInDatabase, uploadMedia } from "../../firebase/firebase";
import EmojiPicker from "emoji-picker-react";

const ChatComponent = ({ clients }) => {
  const [mentorClients, setMentorClients] = useState(clients);
  const [selectedClient, setSelectedClient] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [file, setFile] = useState(null);
  const msgEndRef = useRef(null);

  const [newMsg, setNewMsg] = useState([]);

  const sendMsg = async () => {
    if (file) {
      console.log(file)
      console.log("In File Upload");
      let fileUrl = await uploadMedia(file, "Messages");
      const curClientData = {
        ...selectedClient,
        messages: [
          ...selectedClient.messages,
          {
            createdAt: new Date().toDateString(),
            msg: fileUrl,
            sendBy: "jatin.dsquare@gmail.com",
          },
        ],
      };

      setSelectedClient(curClientData);
      setMentorClients(
        mentorClients.map((data) => {
          if (data.uid === selectedClient.uid) {
            return (data = curClientData);
          } else return data;
        })
      );

      setNewMsg("");
      setFile(null);
      await updateMsgsInDatabase(selectedClient.uid, curClientData);
    } else {
      console.log("In Text");
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
      setMentorClients(
        mentorClients.map((data) => {
          if (data.uid === selectedClient.uid) {
            return (data = curClientData);
          } else return data;
        })
      );

      setNewMsg("");
      // await updateMsgsInDatabase(selectedClient.uid, curClientData);
    }
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
            {mentorClients.map((client) => (
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
            {selectedClient?.messages ? (
              selectedClient.messages.map((curMsg) => (
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
            ) : (
              <h3 className={styles["chat-area__message"]}>
                Select a client first
                <br />
                to start chatting
              </h3>
            )}
            <div ref={msgEndRef} />
          </div>

          <div className={styles["bottom-bar"]}>
            <label htmlFor="file">
              <img
                src={attachment}
                alt="attachment"
                className={styles.attachment}
              />
            </label>
            <input
              onInput={(e) => setFile(e.target.files[0])}
              type="file"
              id="file"
              style={{ display: "none" }}
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
