import { reactive, VNode } from "vue";
import { DiscordAccount, User } from "@prisma/client";
import { ALERT_COLOR_CLASSES } from "../components/elements/alert";

export type StoreAccount = DiscordAccount & { user: User };

export interface Alert {
  color: keyof typeof ALERT_COLOR_CLASSES;
  content: string | VNode;
}

export const store = reactive({
  account: null as StoreAccount | null,
  alerts: [] as Alert[],
});

export * from "./fluent/alert";
