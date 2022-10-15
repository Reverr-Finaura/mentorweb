import React from "react";
import { Route, Routes } from "react-router-dom";
import Calender from "../pages/Calender/Calender";
import Chat from "../pages/Chats/Chat";
import MentorPOV from "../pages/Mentor pov/MentorPOV";
import Login from "../pages/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MentorPOV />} />
      <Route path="/schedule" element={<Calender />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
