import { $http } from "..";
import { StoreAccount } from "../../store";
import { SuccessOrErrorPartial } from "../types";

export interface FetchMeData {
  account: StoreAccount;
}

export const fetchMe = async () =>
  $http.request<SuccessOrErrorPartial<FetchMeData>>({
    method: "GET",
    url: "/user/me",
  });

export const updateMe = async (data: Partial<StoreAccount["user"]>) =>
  $http.request<SuccessOrErrorPartial<{ message: "ok" }>>({
    method: "PATCH",
    url: "/user/me",
    data,
  });
