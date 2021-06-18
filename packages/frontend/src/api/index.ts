import axios from "axios";

export const $http = axios.create({
  // TODO: fixup for prod
  // TODO: better handling of DEV_URL
  baseURL: "http://127.0.0.1:4200/api",
});
