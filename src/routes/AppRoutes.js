import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chats/Chat";
import MentorPOV from "../pages/Mentor pov/MentorPOV";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MentorPOV />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
