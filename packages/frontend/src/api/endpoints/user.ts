import { $http } from "..";
import { StoreAccount } from "../../store";
import { SuccessOrErrorPartial, User } from "../types";

export interface FetchMeData {
  account: StoreAccount;
}

export const fetchMe = async () =>
  $http.request<SuccessOrErrorPartial<FetchMeData>>({
    method: "GET",
    url: "/user/me",
  });
