import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatComponent.module.css";
import add from "../../assets/img/add.png";
import options from "../../assets/img/options.png";
import attachment from "../../assets/img/attachment.png";
import emoji from "../../assets/img/emoji.png";
// import { updateMsgsInDatabase, uploadMedia } from "../../firebase/firebase";
import EmojiPicker from "emoji-picker-react";
import {
  getMentorClientsDatabase,
  getUserFromDatabase,
  updateMsgsInDatabase,
} from "../../firebase/firebase";

const ChatComponent = ({ clients, clientMsgs }) => {
  const [selectedClient, setSelectedClient] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [mentorClientMsgs, setMentorClientMsgs] = useState(clientMsgs);

  console.log(mentorClientMsgs);
  const [file, setFile] = useState(null);
  const msgEndRef = useRef(null);

  const [newMsg, setNewMsg] = useState([]);

  // console.log(selectedClient);

  const sendMsg = async () => {
    // if (file) {
    //   console.log(file)
    //   console.log("In File Upload");
    //   let fileUrl = await uploadMedia(file, "Messages");
    //   const curClientData = {
    //     ...selectedClient,
    //     messages: [
    //       ...selectedClient.messages,
    //       {
    //         createdAt: new Date().toDateString(),
    //         msg: fileUrl,
    //         sendBy: "jatin.dsquare@gmail.com",
    //       },
    //     ],
    //   };

    //   setSelectedClient(curClientData);
    //   setMentorClients(
    //     mentorClients.map((data) => {
    //       if (data.uid === selectedClient.uid) {
    //         return (data = curClientData);
    //       } else return data;
    //     })
    //   );

    //   setNewMsg("");
    //   setFile(null);
    //   await updateMsgsInDatabase(selectedClient.uid, curClientData);
    // } else {

    var curClientData;

    if (selectedClient.messages === null) {
      curClientData = {
        ...selectedClient,
        messages: [
          {
            createdAt: new Date().toDateString(),
            msg: newMsg,
            sendBy: "jatin.dsquare@gmail.com",
          },
        ],
      };
    } else {
      curClientData = {
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
    }

    setSelectedClient(curClientData);

    for (let i = 0; i < mentorClientMsgs.length; i++) {
      if (mentorClientMsgs[i] === selectedClient.email) {
        console.log(true);
      } else {
        // setMentorClientMsgs([...mentorClientMsgs, curClientData]);

        console.log(false);
      }
    }

    console.log("cur : ", curClientData);

    setNewMsg("");

    // await updateMsgsInDatabase(selectedClient.email, curClientData);
  };

  const onEmojiClickHandler = (emojiObj) => {
    setNewMsg((prevInput) => prevInput + emojiObj.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    msgEndRef.current?.scrollIntoView();
  }, [newMsg, selectedClient]);

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
            {clients.map((client, index) => (
              <div
                key={index}
                onClick={() => {
                  mentorClientMsgs.map((data) => {
                    if (data.email === client.email) {
                      setSelectedClient({
                        image: client.image,
                        name: client.name,
                        ...data,
                      });
                    } else {
                      setSelectedClient({
                        image: client.image,
                        name: client.name,
                        email: client.email,
                        messages: null,
                      });
                    }
                  });
                }}
              >
                {client.name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles["chat-section"]}>
          <div className={styles["top-bar"]}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {selectedClient.length === 0 ? null : (
                <img
                  src={selectedClient.image}
                  alt="profile"
                  className={styles.profile}
                />
              )}
              {selectedClient ? <h3>{selectedClient.name}</h3> : null}
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
            ) : selectedClient?.messages === null ? (
              <h3 style={{ color: "grey" }}>No Conversation yet!</h3>
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
              // disabled={selectedClient.length === 0 ? true : false}
            />
          </div>
        </div>
      </div>
      {showEmojiPicker && (
        <div className={styles["emoji-picker"]}>
          <EmojiPicker onEmojiClick={onEmojiClickHandler} width={300} />
        </div>
      )}
    </>
  );
};

export default ChatComponent;
