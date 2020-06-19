import React, { createContext, useReducer } from "react";
import axios from "config/axios";

const initialState = {
  groups: [],
  loading: false,
  noGroups: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setLoading":
      return { ...state, loading: action.payload };
    case "setGroups":
      return { ...state, groups: [...action.payload] };
    case "noGroups":
      return { ...state, noGroups: true };
  }
};

export const groupContext = createContext({});

export default function GroupContextProvider({ children }) {
  const [{ groups, loading }, dispatch] = useReducer(reducer, initialState);

  const getAllGroups = async () => {
    setLoading(true);
    try {
      let response = await axios({
        method: "get",
        url: "/groups.list",
      });
      let { groups } = response.data;
      groups.length > 0
        ? dispatch({ type: "setGroups", payload: groups })
        : dispatch({ type: "noGroups" });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const setLoading = (value) => {
    dispatch({ type: "setLoading", payload: value });
  };

  const uploadFile = async (data) => {
    let {
      groupId,
      file,
      msg = "This is a message with a file",
      description = "Simple file",
    } = data;
    const newData = new FormData();
    newData.append("file", file);
    // newData.append("type", "application/msword");
    try {
      await axios({
        method: "post",
        url: `rooms.upload/${groupId}`,
        data: newData,

        headers: {
          "content-type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <groupContext.Provider
      value={{
        groups,
        loading,
        getAllGroups,
        uploadFile,
      }}
    >
      {children}
    </groupContext.Provider>
  );
}
