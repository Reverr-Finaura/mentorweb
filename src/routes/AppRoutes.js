import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chats/Chat";
import MentorPOV from "../pages/Mentor pov/MentorPOV";
import Transaction from "../pages/Transaction/Transaction";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MentorPOV />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  );
};

export default AppRoutes;
