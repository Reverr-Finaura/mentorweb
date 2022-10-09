import React from "react";
import styles from "./ChatComponent.module.css";
import add from "../../assets/img/add.png";
import options from "../../assets/img/options.png";
import attachment from "../../assets/img/attachment.png";
import emoji from "../../assets/img/emoji.png";

const ChatComponent = () => {
  return (
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
          <div>Raj</div>
        </div>
      </div>
      <div className={styles["chat-section"]}>
        <div className={styles["top-bar"]}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="https://sm.askmen.com/t/askmen_in/article/f/facebook-p/facebook-profile-picture-affects-chances-of-gettin_fr3n.1200.jpg"
              alt="profile"
              className={styles.profile}
            />
            <h3>Name</h3>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={add} alt="add" className={styles.add} />
            <img src={options} alt="add" className={styles.options} />
          </div>
        </div>

        <div className={styles["chat-area"]}></div>

        <div className={styles["bottom-bar"]}>
          <img
            src={attachment}
            alt="attachment"
            className={styles.attachment}
          />
          <img src={emoji} alt="emoji" className={styles.emoji} />
          <input
            type="text"
            placeholder="Message"
            className={styles["message-input"]}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
