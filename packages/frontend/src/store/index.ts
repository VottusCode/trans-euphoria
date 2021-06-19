import { reactive } from "vue";
import { User } from "../api/types";
import { DiscordAccount } from "@prisma/client";

export type StoreAccount = DiscordAccount & { user: User };

export const oldStore = reactive({
  user: null as User | null,
});

export const store = reactive({
  account: null as StoreAccount | null,
});
