import React from "react";
import { Route, Routes } from "react-router-dom";
import Calender from "../pages/Calender/Calender";
import Chat from "../pages/Chats/Chat";
import MentorPOV from "../pages/Mentor pov/MentorPOV";
import Transaction from "../pages/Transaction/Transaction";
import Login from "../pages/Login/Login";
import MyProfile from "../pages/MyProfile/MyProfile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MentorPOV />} />
      <Route path="/schedule" element={<Calender />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/myprofile" element={<MyProfile />} />
    </Routes>
  );
};

export default AppRoutes;
