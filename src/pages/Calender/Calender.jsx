import React, { useEffect, useState } from "react";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/search/Search";
import styles from "./Calender.module.css";

const Calender = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
      <PhnSidebar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            <Search />
            <div className={styles.schedule_container}>
              <h1>Set your availability</h1>
              <p>
                Let us know when you’re typically available to accept meetings.
              </p>
              <hr className={styles.hr} />
              <h3 className={styles.text}>Available Hours</h3>
              <div className={styles.hours}>
                <select name="hours" id="" className={styles.starthr}>
                  <option value="">9:00 am</option>
                  <option value="">10:00 am</option>
                  <option value="">12:00 am</option>
                </select>
                <select name="hours" id="" className={styles.endhr}>
                  <option value="">5:00 pm</option>
                  <option value="">6:00 pm</option>
                  <option value="">7:00 pm</option>
                </select>
              </div>
              <h3 className={styles.text}>Available days</h3>
              <div className={styles.days}>
                <button>Sunday</button>
                <button>Monday</button>
                <button>Tuesday</button>
                <button>Wednesday</button>
                <button>Thursday</button>
                <button>Friday</button>
                <button>Saturday</button>
              </div>
              <p className={styles.info}>
                Don’t worry! You’ll be able to further customize your
                availability later on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calender;
