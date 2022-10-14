import React, { useEffect, useState } from "react";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./MentorPov.module.css";
import Search from "../../components/search/Search";
import JoinMeet from "../../components/Join meet/JoinMeet";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import UpcomingMeeting from "../../components/UpcomingMeeting/UpcomingMeeting";

const MentorPOV = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const meetings = [
    {
      date: "24th September",
      with: "Dr. Simon",
    },
    {
      date: "28th September",
      with: "Dr. Jay",
    },
    {
      date: "30th September",
      with: "Dr. Vinna",
    },
  ];

  return (
    <>
      <PhnSidebar />
      <div className={styles.container}>
        <Navbar />
        <div className={styles.body}>
          <Sidebar isVisible={width >= 600 ? true : false} />
          <div className={styles.content}>
            <Search />
            <JoinMeet />
            <div className={styles.meetsNCal}>
              <div className={styles.meets}>
                <h3>Meet</h3>
                <div>
                  {meetings.map((m, index) => (
                    <UpcomingMeeting
                      key={index + Math.random()}
                      date={m.date}
                      email={m.with}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.calender}>
                <h1>Calender</h1>
                <Calender className={styles.cal} />
                <div className={styles.meetSch}>
                  <h3>Schedule</h3>
                  <p>
                    13th April <span>Meet with Mr. Raj</span>
                  </p>
                  <p>
                    22nd April <span>Meet with Mr. Raj</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorPOV;
