import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from "react";
import ChatBody from "./ChatBody";
import { groupContext } from "contexts";
import { chatContext } from "components/Chat/ChatContainer";
// import isEmpty from "lodash/isEmpty";

export default function ChatBodyContainer({ selected, classes }) {
  const { groups, loading, noGroups } = useContext(groupContext);
  const {
    messages,
    sendMessage,
    fetchHistory,
    subscribeToRoom,
    unsubscribeToRoom,
    chatDomContainer,
  } = useContext(chatContext);

  // console.log(messages);
  let group = groups[selected];
  const prevGroup = useRef();

  useEffect(() => {
    prevGroup.current && unsubscribeToRoom(prevGroup.current);
    fetchHistory(group._id);
    subscribeToRoom(group._id);
    prevGroup.current = group._id;
  }, [group._id]);

  return (
    <React.Fragment>
      {!loading && Object.keys(group).length > 0 && (
        <ChatBody
          ref={chatDomContainer}
          group={group}
          classes={classes}
          messages={messages}
          sendMessage={sendMessage}
          domElement={chatDomContainer}
        />
      )}
    </React.Fragment>
  );
}
