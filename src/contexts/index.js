import React from "react";
import AuthContextProvider, { authContext } from "./authContext";
import GroupContextProvider, { groupContext } from "./groupContext";

export default function Provider({ children }) {
  return (
    <AuthContextProvider>
      <GroupContextProvider>{children}</GroupContextProvider>
    </AuthContextProvider>
  );
}

export { authContext, groupContext };
