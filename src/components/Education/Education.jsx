import React from "react";
import styles from "./Education.module.css";

const Education = (props) => {
  return (
    <div className={styles.education}>
      <select id="degree" name="degree">
        <option selected disabled>
          Degree
        </option>
        <option>High School</option>
        <option>Intermediate</option>
        <option>Graduation</option>
        <option>Post Graduation</option>
      </select>

      <select id="college" name="college">
        <option selected disabled>
          College/School
        </option>
        <option>Option1</option>
        <option>Option2</option>
        <option>Option3</option>
        <option>Option4</option>
      </select>
      <br />
      <label for="starting-date">Starting Date: </label>
      <input id="starting-date" type="date" />
      <br />
      <label for="last-date">Last Date: </label>
      <input id="last-date" type="date" />

      <img
        src="/images/add.png"
        className={styles.add}
        alt="add"
        onClick={() => props.children}
      />
    </div>
  );
};

export default Education;
