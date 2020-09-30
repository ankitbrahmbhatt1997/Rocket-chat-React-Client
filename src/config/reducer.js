import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "slices/chatSlice";
import groupReducer from "slices/groupSlice";
import authReducer from "slices/authSlice";

export default combineReducers({
  chat: chatReducer,
  groups: groupReducer,
  auth: authReducer,
});
