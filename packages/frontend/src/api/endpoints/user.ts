import { $http } from "..";
import { StoreAccount } from "../../store";
import { SuccessOrErrorPartial } from "../types";
import { User, DiscordAccount } from "@prisma/client";

export interface PublicUser {
  id: User["id"];
  name: User["username"];
  gender: User["gender"];
  pronouns: User["pronouns"];
  sexuality: User["sexuality"];
  about: User["about"];
  discordId: DiscordAccount["id"];
  avatar: DiscordAccount["avatarId"];
}
export interface FetchMeData {
  account: StoreAccount;
}

export interface FetchUserData {
  user: PublicUser;
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

export const fetchUser = async (id: string) =>
  $http.request<SuccessOrErrorPartial<FetchUserData>>({
    method: "GET",
    url: `/user/${id}`,
  });
