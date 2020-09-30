import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from "react";
import ChatBody from "./ChatBody";
import { Box } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { containerContext } from "components/Chat/ChatContainer";
import { setAnchorMessage } from "slices/chatSlice";
import { fetchMembers, setActive } from "slices/groupSlice";
import isEmpty from "lodash/isEmpty";

import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  fetchHistory,
  subscribeToRoom,
  unsubscribeToRoom,
  subscribeUserStatus,
  typingIndicatorSub,
  scrollToLast,
  scrollToMessage,
} from "utils/chatUtils";
// import isEmpty from "lodash/isEmpty";

export default function ChatBodyContainer({
  selected,
  classes,
  rightDocOpen,
  smallScreen,
  setStep,
}) {
  const dispatch = useDispatch();
  const { ws, messageContainer } = useContext(containerContext);

  const { typing, messages, anchorMessage } = useSelector(
    (state) => state.chat,
    shallowEqual
  );

  const { groups, members } = useSelector(
    (state) => state.groups,
    shallowEqual
  );

  let group = groups[selected];
  const prevGroup = useRef();

  useEffect(() => {
    dispatch(setActive(group._id));
    dispatch(fetchMembers(group._id));
    prevGroup.current && unsubscribeToRoom(ws);
    fetchHistory(ws, group._id);
    anchorMessage
      ? scrollToMessage(messageContainer, anchorMessage, () => {
          dispatch(setAnchorMessage(null));
        })
      : scrollToLast(messageContainer);
    subscribeToRoom(ws, group._id);
    typingIndicatorSub(ws, group._id);
    prevGroup.current = group._id;
  }, [group._id]);

  return (
    <React.Fragment>
      {!isEmpty(group) && (
        <ChatBody
          rightDocOpen={rightDocOpen}
          group={group}
          classes={classes}
          messages={messages}
          members={members}
          typing={typing}
          messageContainer={messageContainer}
          smallScreen={smallScreen}
          setStep={setStep}
        />
      )}
    </React.Fragment>
  );
}
