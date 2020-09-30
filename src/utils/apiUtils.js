import { baseUrl } from "config/axios";

export const downloadDoc = (url) => {
  window.open(`${baseUrl}${url}`, "_blank");
};
