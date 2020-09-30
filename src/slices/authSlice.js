import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
import { setAuthToken, getAuthToken } from "utils/localStorage";

const { token } = getAuthToken();

export const initialState = {
  isAuthenticated: token ? true : false,
  token: token ? token : "",
  user: {},
  loading: false,
  errors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProgress: (state, { payload }) => {
      state.loading = payload;
    },
    setAuthenticated: (state, { payload }) => {
      state.isAuthenticated = true;
      state.user = payload;
    },
    setLoggedOut: (state, { payload }) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const registerUser = (data) => {
  return async (dispatch) => {
    dispatch(setProgress(true));
    try {
      await axios({
        method: "post",
        url: "/api/v1/users.register",
        data,
      });
      dispatch(setProgress(false));
    } catch (err) {
      console.log(err);
      dispatch(setProgress(false));
    }
  };
};
export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch(setProgress(true));

    try {
      let response = await axios({
        method: "post",
        url: "/api/v1/login",
        data,
      });
      const {
        data: {
          data: {
            authToken,
            me: { name, emails, username, _id },
          },
        },
      } = response;
      setAuthToken(authToken, _id);
      dispatch(setAuthenticated({ name, emails, username }));
      dispatch(setProgress(false));
    } catch (err) {
      console.log(err);
      dispatch(setProgress(false));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    setAuthToken("", "");
    dispatch(setLoggedOut());
  };
};

export const getUser = () => {
  return async (dispatch) => {
    dispatch(setProgress(true));
    try {
      let response = await axios({
        method: "get",
        url: "/api/v1/me",
      });
      let { name, username, emails } = response.data;
      dispatch(setProgress(false));

      dispatch(setAuthenticated({ name, username, emails }));
    } catch (err) {
      console.log(err);
      dispatch(setProgress(false));
    }
  };
};

export const {
  setProgress,
  setAuthenticated,
  setLoggedOut,
} = authSlice.actions;

export default authSlice.reducer;
