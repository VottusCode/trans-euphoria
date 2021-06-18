import { $http } from "..";
import { SuccessOrErrorPartial } from "../types";

export interface AuthorizeData {
  message: "ok";
}

export const authorize = (code: string) =>
  $http.request<SuccessOrErrorPartial<AuthorizeData>>({
    method: "GET",
    url: "/auth/authorize",
    params: {
      code,
    },
  });

export const logout = () =>
  $http.request<SuccessOrErrorPartial<AuthorizeData>>({
    method: "GET",
    url: "/auth/logout",
  });
