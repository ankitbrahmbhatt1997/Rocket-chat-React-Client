import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";

const statusMap = {
  0: "offline",
  1: "online",
  3: "away",
  4: "busy",
};

export const initialState = {
  loading: false,
  groups: [],
  activeGroup: "",
  members: {},
};

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setProgress: (state, { payload }) => {
      state.loading = payload;
    },
    setGroups: (state, { payload }) => {
      state.groups = [...payload];
    },
    setMembers: (state, { payload }) => {
      state.members = payload;
    },
    setError: (state) => {
      state.loading = false;
    },
    setActive: (state, { payload }) => {
      state.activeGroup = payload;
    },
  },
});

export const setAllMembers = (membersArray) => {
  return (dispatch) => {
    let membersObject = {};
    membersArray.forEach((member) => {
      membersObject[member._id] = { ...member };
    });
    dispatch(setMembers(membersObject));
  };
};

export const getAllGroups = () => {
  return async (dispatch) => {
    dispatch(setProgress(true));
    try {
      let response = await axios({
        method: "get",
        url: "/api/v1/groups.list",
      });
      let { groups } = response.data;
      dispatch(setGroups(groups));

      dispatch(setProgress(false));
    } catch (err) {
      console.log(err);
      dispatch(setProgress(false));
    }
  };
};

export const fetchMembers = (groupId) => {
  return async (dispatch) => {
    try {
      dispatch(setProgress(true));

      let response = await axios({
        method: "get",
        url: `/api/v1/groups.members`,
        params: {
          roomId: groupId,
        },
      });
      let {
        data: { members },
      } = response;
      dispatch(setAllMembers(members));
      dispatch(setProgress(false));
    } catch (err) {
      console.log(err);
      dispatch(setProgress(false));
    }
  };
};

export const uploadFile = (data) => {
  return async (dispatch) => {
    let {
      groupId,
      file,
      msg = "This is a message",
      description = "Simple file",
    } = data;

    const newData = new FormData();

    newData.append("file", file);
    newData.append("msg", file.name);
    try {
      await axios({
        method: "post",
        url: `/api/v1/rooms.upload/${groupId}`,
        data: newData,

        headers: {
          "content-type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const {
  setProgress,
  setGroups,
  setError,
  setActive,
  setMembers,
} = groupSlice.actions;

export default groupSlice.reducer;
