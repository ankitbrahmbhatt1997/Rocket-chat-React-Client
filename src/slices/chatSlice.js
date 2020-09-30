import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  messages: [],
  error: {},
  typing: {},
  connected: false,
  anchorMessage: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setProgress: (state, { payload }) => {
      state.loading = payload;
    },
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    setError: (state) => {
      state.loading = false;
    },
    setTyping: (state, { payload }) => {
      state.typing = payload;
    },
    setConnected: (state, { payload }) => {
      state.connected = payload;
    },
    setAnchorMessage: (state, { payload }) => {
      state.anchorMessage = payload;
    },
  },
});

export const {
  setProgress,
  setMessages,
  addMessage,
  setTyping,
  setConnected,
  setAnchorMessage,
} = chatSlice.actions;

export default chatSlice.reducer;
