import axios from "axios";
import { getAuthToken } from "utils/localStorage";

export const baseUrl = `http://localhost:3000`;

export const vchost = "your vc server link";

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
