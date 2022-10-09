import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppRoutes;
