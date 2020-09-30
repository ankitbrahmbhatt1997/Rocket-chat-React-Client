import axios from "axios";
import { getAuthToken } from "utils/localStorage";

export const baseUrl = `http://192.168.153.128:3000`;

export const vchost = "vc.webnyay.in";

const { token, userId } = getAuthToken();
let headers;
if (token) {
  headers = {
    "X-Auth-Token": token,
    "X-User-Id": userId,
  };
} else {
  headers = {};
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers,
});

export default instance;
