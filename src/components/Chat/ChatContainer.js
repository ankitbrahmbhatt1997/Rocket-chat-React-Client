import { useMediaQuery, useTheme } from "@material-ui/core";
import { useWebsocket } from "hooks";
import isEmpty from "lodash/isEmpty";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "slices/groupSlice";
import Chat from "./Chat";

// context for ws and container ref
export const containerContext = createContext(null);

export default function ChatContainer() {
  const dispatch = useDispatch();
  const { Provider: ChatProvider } = containerContext;

  // small screen logic
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const { groups } = useSelector((state) => state.groups);

  const [showVC, setShowVC] = useState(false);

  // Chat messages container
  const messageContainer = React.useRef(null);

  const { connected, ws } = useWebsocket(
    `ws://localhost:3000/websocket`,
    messageContainer
  );

  useEffect(() => {
    dispatch(getAllGroups());
  }, []);

  const chatProps = {
    showVC,
    setShowVC,
    isSmallScreen,
  };

  if (!connected) return <h1>Not connnected yet</h1>;

  if (isEmpty(groups)) return <h1>No groups....dah!</h1>;

  return (
    <ChatProvider value={{ messageContainer, ws, showVC, setShowVC }}>
      <Chat {...chatProps} />
    </ChatProvider>
  );
}
