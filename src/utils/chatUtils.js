import { getAuthToken } from "utils/localStorage";

let uniqueIds = {
  login: "0",
  fetchHistory: "1",
  sendMessage: "5",
  subscribeRoom: "3",
  subscribeStatus: "6",
  setOnlineStatus: "7",
  typingStatus: "8",
};

export const connectMessage = (ws) => {
  let openingMessage = {
    msg: "connect",
    version: "1",
    support: ["1"],
  };
  ws.current.send(JSON.stringify(openingMessage));
};

export const pongMessage = (ws, evt) => {
  const message = JSON.parse(evt.data);
  if (message.msg === "ping") {
    ws.current.send(JSON.stringify({ msg: "pong" }));
  }
};

export const login = (ws) => {
  let { token, userId } = getAuthToken();
  let msg = {
    msg: "method",
    method: "login",
    id: uniqueIds.login,
    params: [{ resume: token }],
  };
  ws.current.send(JSON.stringify(msg));
};

export const sendMessage = (ws, message, groupId) => {
  let msg = {
    msg: "method",
    method: "sendMessage",
    id: uniqueIds.sendMessage,
    params: [
      {
        rid: groupId,
        msg: message,
      },
    ],
  };
  ws.current.send(JSON.stringify(msg));
};

export const fetchHistory = (ws, groupId) => {
  let msg = {
    msg: "method",
    method: "loadHistory",
    id: uniqueIds.fetchHistory,
    params: [groupId, null, 50, null],
  };
  ws.current.send(JSON.stringify(msg));
};

export const subscribeToRoom = (ws, groupId) => {
  let msg = {
    msg: "sub",
    id: uniqueIds.subscribeRoom,
    name: "stream-room-messages",
    params: [groupId, false],
  };
  ws.current.send(JSON.stringify(msg));
};

export const unsubscribeToRoom = (ws) => {
  let msg = {
    msg: "unsub",
    id: uniqueIds.subscribeRoom,
  };
  ws.current.send(JSON.stringify(msg));
};

export const subscribeUserStatus = (ws) => {
  let msg = {
    msg: "sub",
    id: uniqueIds.subscribeStatus,
    name: "stream-notify-logged",
    params: ["user-status", false],
  };

  ws.current.send(JSON.stringify(msg));
};

export const isUserStatus = ({ msg, collection, id }) => {
  return (
    msg === "changed" &&
    collection === "stream-notify-logged" &&
    id === uniqueIds.subscribeStatus
  );
};

export const setOnlineStatus = (ws) => {
  let msg = {
    msg: "method",
    method: "UserPresence:setDefaultStatus",
    id: uniqueIds.setOnlineStatus,
    params: ["online"],
  };
  ws.current.send(JSON.stringify(msg));
};

export const typingIndicatorSub = (ws, groupId) => {
  let msg = {
    msg: "sub",
    id: "8",
    name: "stream-notify-room",
    params: [`${groupId}/typing`, false],
  };
  ws.current.send(JSON.stringify(msg));
};

export const typingIndicator = (ws, groupId, username, typing) => {
  let msg = {
    msg: "method",
    method: "stream-notify-room",
    id: "8",
    params: [`${groupId}/typing`, username, typing],
  };
  ws.current.send(JSON.stringify(msg));
};

export const scrollToLast = (messageContainer) => {
  messageContainer.current &&
    messageContainer.current.scrollTo({
      top: messageContainer.current.scrollHeight,
      behavior: "smooth",
    });
};

export const scrollToMessage = (
  messageContainer,
  anchorMessage,
  removeAnchorMessage
) => {
  // messageContainer.scrollTop = height;
  const messageDom = document.getElementById(anchorMessage);
  messageContainer.current &&
    messageContainer.current.scrollTo({
      top: messageDom.offsetTop - 80,
      behavior: "smooth",
    });
  removeAnchorMessage();
};
