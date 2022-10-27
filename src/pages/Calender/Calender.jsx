import React, { useCallback, useEffect, useState } from "react";
import PhnSidebar from "../../components/PhnSidebar/PhnSidebar";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Search from "../../components/search/Search";
import styles from "./Calender.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db, getMentorFromDatabase } from "../../firebase/firebase";
import { updateUserInDatabse } from "../../firebase/firebase";

const Calender = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [fetchedMentor, setFetchedMentor] = useState("");
  var availabilityArray = ["0", "0", "0", "0", "0", "0", "0"];
  // const [availabilityTime, setAvailabilityTime] = useState({
  //   availableFrom: "09:00",
  //   availableTill: "17:00",
  // });

  // const selectStartTime = (e) => {
  //   setAvailabilityTime((prevState) => {
  //     return { ...prevState, availableFrom: e.target.value };
  //   });
  //   console.log(availabilityTime);
  // };

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  const week = [
    { id: 0, day: "Sunday"},
    { id: 1, day: "Monday" },
    { id: 2, day: "Tuesday" },
    { id: 3, day: "Wednesday" },
    { id: 4, day: "Thursday" },
    { id: 5, day: "Friday" },
    { id: 6, day: "Saturday" },
  ];

  const getMentor = useCallback(async () => {
    const results = await getMentorFromDatabase("jatin.dsquare@gmail.com");
    setFetchedMentor(results);
  }, []);

  const updateAvailability = async () => {
    await updateUserInDatabse(fetchedMentor.email, "Users", {
      ...fetchedMentor,
      availability: availabilityArray,
    });
  };

  const updateDayToArray = (id) => {
    availabilityArray[id] = "1";
    console.log(availabilityArray);
  };

  useEffect(() => {
    getMentor();
  }, []);

  console.log(fetchedMentor);

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
            {/* <Search /> */}
            <div className={styles.schedule_container}>
              <h1>Set your availability</h1>
              <p>
                Let us know when you’re typically available to accept meetings.
              </p>
              <hr className={styles.hr} />
              <h3 className={styles.text}>Available Hours</h3>
              <div className={styles.hours}>
                <select name="hours" id="" className={styles.starthr}>
                  <option value="">09:00</option>
                  <option value="">10:00</option>
                  <option value="">12:00</option>
                  <option value="">13:00</option>
                  <option value="">14:00</option>
                  <option value="">15:00</option>
                  <option value="">16:00</option>
                </select>
                <select name="hours" id="" className={styles.endhr}>
                  <option value="">10:00</option>
                  <option value="">12:00</option>
                  <option value="">13:00</option>
                  <option value="">14:00</option>
                  <option value="">15:00</option>
                  <option value="">16:00</option>
                  <option value="">17:00</option>
                  <option value="">18:00</option>
                  <option value="">19:00</option>
                </select>
              </div>
              <h3 className={styles.text}>Available days</h3>
              <div className={styles.days}>
                {week.map((weekday) => (
                  <button
                    onClick={() => updateDayToArray(weekday.id)}
                    key={weekday.id + Math.random()}
                  >
                    {weekday.day}
                  </button>
                ))}
              </div>
              <button
                onClick={updateAvailability}
                className={styles.confirmBtn}
              >
                Confirm
              </button>
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
