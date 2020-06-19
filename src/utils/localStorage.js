export const setAuthToken = (token, id) => {
  localStorage.setItem("chatToken", token);
  localStorage.setItem("userId", id);
};

export const getAuthToken = (token) => {
  return {
    token: localStorage.getItem("chatToken"),
    userId: localStorage.getItem("userId"),
  };
};
