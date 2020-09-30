import React, {
  useContext,
  useEffect,
  useRef,
  createContext,
  useState,
  Fragment,
} from "react";
import Chat from "./Chat";
import { getAllGroups } from "slices/groupSlice";
import { useSelector, useDispatch } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { getWindowDimension } from "utils/responsiveUtils";
import { useWebsocket } from "hooks";

// context for ws and container ref
export const containerContext = createContext(null);

export default function ChatContainer() {
  const dispatch = useDispatch();

  const { groups } = useSelector((state) => state.groups);

  const [showVC, setShowVC] = useState(false);

  // Chat messages container
  const messageContainer = React.useRef(null);

  const { connected, ws } = useWebsocket(
    `ws://192.168.153.128:3000/websocket`,
    messageContainer
  );

  // responsive screen logic
  const { height, width } = getWindowDimension();
  const [screenWidth, setWidth] = useState(width);

  const handleResize = () => {
    const { height, width } = getWindowDimension();
    setWidth(width);
  };

  useEffect(() => {
    dispatch(getAllGroups());
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <containerContext.Provider
      value={{ messageContainer, ws, showVC, setShowVC }}
    >
      {!isEmpty(groups) && connected ? (
        <Chat screenWidth={screenWidth} showVC={showVC} setShowVC={setShowVC} />
      ) : (
        <h1>No groups....dah!</h1>
      )}
    </containerContext.Provider>
  );
}
