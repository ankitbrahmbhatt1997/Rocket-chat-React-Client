import React, {
  useContext,
  useEffect,
  useRef,
  useReducer,
  useState,
} from "react";
import Chat from "./Chat";
import { groupContext } from "contexts";
import { getAuthToken } from "utils/localStorage";

export const chatContext = React.createContext();

const initialState = { messages: [], activeGroup: {} };

const reducer = (state, action) => {
  switch (action.type) {
    case "setMessages":
      return { messages: action.payload };
    case "addMessage":
      return { messages: [...state.messages, action.payload] };
  }
};

export default function ChatContainer() {
  const { getAllGroups, loading: groupLoading, groups } = useContext(
    groupContext
  );
  const [{ messages }, dispatch] = useReducer(reducer, initialState);
  const chatDomContainer = useRef(null);

  const ws = useRef(null);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    getAllGroups();
  }, []);

  const connectMessage = () => {
    let openingMessage = {
      msg: "connect",
      version: "1",
      support: ["1"],
    };
    ws.current.send(JSON.stringify(openingMessage));
  };

  const pongMessage = (evt) => {
    const message = JSON.parse(evt.data);
    if (message.msg === "ping") {
      ws.current.send(JSON.stringify({ msg: "pong" }));
    }
  };

  const login = () => {
    let { token, userId } = getAuthToken();
    let msg = {
      msg: "method",
      method: "login",
      id: "0",
      params: [{ resume: token }],
    };
    ws.current.send(JSON.stringify(msg));
  };

  const sendMessage = (message, groupId) => {
    let msg = {
      msg: "method",
      method: "sendMessage",
      id: "5",
      params: [
        {
          rid: groupId,
          msg: message,
        },
      ],
    };
    ws.current.send(JSON.stringify(msg));
  };

  const fetchHistory = (groupId) => {
    console.log(ws);
    let msg = {
      msg: "method",
      method: "loadHistory",
      id: "1",
      params: [groupId, null, 50, null],
    };
    ws.current.send(JSON.stringify(msg));
  };

  const subscribeToRoom = (groupId) => {
    let msg = {
      msg: "sub",
      id: "3",
      name: "stream-room-messages",
      params: [groupId, false],
    };
    ws.current.send(JSON.stringify(msg));
  };

  const unsubscribeToRoom = () => {
    let msg = {
      msg: "unsub",
      id: "3",
    };
    ws.current.send(JSON.stringify(msg));
  };

  useEffect(() => {
    ws.current = new WebSocket(`ws://192.168.153.128:3000/websocket`);
    ws.current.onopen = () => {
      connectMessage();
      login();

      // listening for messages
      ws.current.onmessage = (evt) => {
        pongMessage(evt);
        let message = JSON.parse(evt.data);

        if (message.msg === "connected") {
          setConnected(true);
        }

        // fetch history reciever
        if (message.msg === "result" && message.id === "1") {
          let history = [...message.result.messages];
          history.reverse();
          dispatch({ type: "setMessages", payload: history });

          // console.log(message);
          // subscribeToRoom(groupId);
        }
        //group  message stream reciever
        else if (
          message.msg === "changed" &&
          message.collection === "stream-room-messages"
        ) {
          let {
            fields: { args },
          } = message;
          console.log(message);
          dispatch({ type: "addMessage", payload: args[0] });
          console.log(chatDomContainer);
        } else {
          // console.log(message);
        }
      };
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <chatContext.Provider
      value={{
        sendMessage,
        fetchHistory,
        subscribeToRoom,
        messages,
        unsubscribeToRoom,
        chatDomContainer,
      }}
    >
      {!groupLoading && groups.length !== 0 && connected ? (
        <Chat />
      ) : (
        <h1>No groups....dah!</h1>
      )}
    </chatContext.Provider>
  );
}
