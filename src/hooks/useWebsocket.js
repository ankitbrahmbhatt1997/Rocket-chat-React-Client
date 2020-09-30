import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTyping, setMessages, addMessage } from "slices/chatSlice";
import {
  scrollToLast,
  connectMessage,
  login,
  pongMessage,
  isUserStatus,
  subscribeUserStatus,
} from "utils/chatUtils";
import { useState } from "react";

export default function useWebsocket(url, messageContainer) {
  const dispatch = useDispatch();
  const {
    typing: { value: typing },
    anchorMessage,
  } = useSelector((state) => state.chat);
  const [connected, setConnected] = useState(false);
  let ws = useRef(null);

  // typing indicator

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      connectMessage(ws);
      login(ws);
      subscribeUserStatus(ws);

      // listening for messages
      ws.current.onmessage = (evt) => {
        // pongMessage(ws, evt);
        let message = JSON.parse(evt.data);

        // connected message reciever
        if (message.msg === "connected") {
          setConnected(true);
          // dispatch(setConnected(true));
        }

        if (message.msg === "ping") {
          pongMessage(ws, evt);
        }

        // fetch history reciever
        if (message.msg === "result" && message.id === "1") {
          let history = [...message.result.messages];
          history.reverse();
          dispatch(setMessages(history));

          // scrollToLast();
        }

        //group  message stream reciever
        else if (
          message.msg === "changed" &&
          message.collection === "stream-room-messages"
        ) {
          let {
            fields: { args, eventName },
          } = message;
          // console.log(message);
          // typingIndicatorSub(ws, group._id);
          dispatch(addMessage(args[0]));
          scrollToLast(messageContainer);
        } else if (isUserStatus(message)) {
          console.log(message);
          let {
            fields: { args },
          } = message;
          args.forEach((arg) => {
            // setStatus(arg[0], arg[2]);
          });
        } else if (
          message.msg === "changed" &&
          message.collection === "stream-notify-room" &&
          message.id === "id"
        ) {
          // console.log(message);
          let {
            fields: { args },
          } = message;
          let groupId = message.fields.eventName.split("/")[0];
          typing !== args[1] &&
            dispatch(setTyping({ username: args[0], value: args[1], groupId }));
        }
        // rest undefined conditions

        console.log(message);
      };
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return { connected, ws };
}
