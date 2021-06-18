import { $http } from "..";
import { SuccessOrErrorPartial, User } from "../types";

export interface FetchMeData {
  user: User;
}

export const fetchMe = async () =>
  $http.request<SuccessOrErrorPartial<FetchMeData>>({
    method: "GET",
    url: "/user/me",
  });
