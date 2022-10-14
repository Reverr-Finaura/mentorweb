import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";

function LoginRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default LoginRoute;
