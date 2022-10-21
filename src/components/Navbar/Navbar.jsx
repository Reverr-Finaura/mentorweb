import { MenuIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  phnSidebarVisible,
  selectPhnSidebar,
} from "../../features/phnSidebarSlice";
import styles from "./Navbar.module.css";

function Navbar() {
  const [width, setWidth] = useState(window.innerWidth);
  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  const [phnOptionsVisible, setPhnOptionsVisible] = useState(false);
  const dispatch = useDispatch();
  return (
    <navbar className={styles.navbar}>
      <MenuIcon
        onClick={() => dispatch(phnSidebarVisible())}
        className={styles.menuIcon}
      />
      <div
        className={styles.logo}
        onClick={() => setPhnOptionsVisible(!phnOptionsVisible)}
      >
        <img src="images/Reverr Black.png" alt="" />
        {/* <p>REVERR</p> */}
      </div>
      <div className={styles.options}>
        <Link className={styles.link} to="/notifications">
          <div>
            <img src="/images/notification.svg" alt="" />
          </div>
        </Link>
        <div>
          <img src="/images/help.svg" alt="" />
        </div>
        <Link className={styles.link} to="/dashboard/#calendar">
          <div>
            <img src="/images/calender.svg" alt="" />
          </div>
        </Link>
        <Link className={styles.link} to="/chat">
          <div>
            <img src="/images/message.svg" alt="" />
          </div>
        </Link>
        <Link className={styles.link} to="/myprofile">
          <div>
            <img src="/images/profile.svg" alt="" />
          </div>
        </Link>
      </div>
      <div
        style={{
          display: phnOptionsVisible && width <= 600 ? "flex" : "none",
        }}
        className={`${styles.phnOptions} animate__animated animate__fadeIn`}
      >
        <div>
          <img src="/images/notification.svg" alt="" />
        </div>
        <div>
          <img src="/images/help.svg" alt="" />
        </div>
        <div>
          <img src="/images/calender.svg" alt="" />
        </div>
        <div>
          <img src="/images/message.svg" alt="" />
        </div>
        <div>
          <img src="/images/profile.svg" alt="" />
        </div>
      </div>
    </navbar>
  );
}

export default Navbar;
