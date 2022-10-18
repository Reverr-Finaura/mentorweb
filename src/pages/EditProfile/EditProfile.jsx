import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./EditProfile.module.css";

const EditProfile = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>Let's get your profile done first!!</h1>
        <form className={styles["edit-profile"]}>
          <div style={{ marginBottom: "2rem" }}>
            <label for="profile-input">
              <img
                src="/images/add-photo.png"
                alt="add-profile"
                style={{ WebkitUserDrag: "none", cursor: "pointer" }}
              />
            </label>
            <input id="profile-input" type="file" style={{ display: "none" }} />
          </div>
          <div className={styles["input-fields"]}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="date" placeholder="Date of Birth" />
            <input type="text" placeholder="Gender" />
            <input type="text" placeholder="Hometown" />
            <input type="text" placeholder="Location" />
            <input
              type="text"
              placeholder="Language"
              style={{ width: "90%" }}
            />
            <textarea placeholder="Add Bio" rows={8} />
          </div>
          <div style={{ marginTop: "2rem" }}>
            <h2>How you want to meet people</h2>
            <div className={styles.social}>
              <img src="/images/instagram.png" alt="instagram" />
              <img src="/images/facebook.png" alt="facebook" />
              <img src="/images/twitter.png" alt="twitter" />
              <img src="/images/linkedin.png" alt="linkedin" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
