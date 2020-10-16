import { containerContext } from "components/Chat/ChatContainer";
import isEmpty from "lodash/isEmpty";
import React, { useContext, useEffect, useRef } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { setAnchorMessage } from "slices/chatSlice";
import { fetchMembers, setActive } from "slices/groupSlice";
import {
  fetchHistory,
  scrollToLast,
  scrollToMessage,
  subscribeToRoom,
  typingIndicatorSub,
  unsubscribeToRoom,
} from "utils/chatUtils";
import ChatBody from "./ChatBody";

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
