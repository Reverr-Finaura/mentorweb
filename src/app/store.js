import { configureStore } from "@reduxjs/toolkit";
import phnSidebarReducer from "../features/phnSidebarSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    phnSidebar: phnSidebarReducer,
    user: userReducer,
  },
});
