import React, { useState, useReducer } from "react";
import axios from "config/axios";
import { setAuthToken, getAuthToken } from "utils/localStorage";
export const authContext = React.createContext({});

const { token } = getAuthToken();
console.log(token);

const initialState = {
  isAuthenticated: token ? true : false,
  token: token ? token : "",
  user: {},
  loading: false,
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "authenticated":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "loggedOut":
      return { ...state, isAuthenticated: false, user: {} };
  }
};

export default function AuthContextProvider({ children }) {
  const [{ isAuthenticated, user, loading, errors }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const registerUser = async (data) => {
    setLoading(true);
    try {
      await axios({
        method: "post",
        url: "/users.register",
        data,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const loginUser = async (data) => {
    setLoading(true);
    try {
      let response = await axios({
        method: "post",
        url: "/login",
        data,
      });
      console.log(response.data);
      const {
        data: {
          data: {
            authToken,
            me: { name, emails, username, _id },
          },
        },
      } = response;
      setAuthToken(authToken, _id);
      dispatch({ type: "authenticated", payload: { name, emails, username } });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    setAuthToken("", "");
    dispatch({ type: "loggedOut" });
  };

  const getUser = async () => {
    setLoading(true);
    try {
      let response = await axios({
        method: "get",
        url: "/me",
      });
      let { name, username, emails } = response.data;
      setLoading(false);
      dispatch({ type: "authenticated", payload: { name, username, emails } });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const setLoading = (value) => {
    dispatch({ type: "setLoading", payload: value });
  };
  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        getUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
