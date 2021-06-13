import { PrismaClient } from "@prisma/client";
import {
  Message,
  Snowflake,
  StringResolvable,
  TextChannel,
} from "discord.js-light";
import { EuphoriaClient } from "../discord/client";

export interface Container {
  db: PrismaClient;
  bot: EuphoriaClient;
}

export interface CommandContext {
  args: string[];
  message: Message;
}

export interface Command {
  name: string;
  aliases: string[];
  permissions?: {
    roles: Snowflake[];
    only?: boolean;
    failMessage?: (context: CommandContext) => StringResolvable;
  };
  // default: false
  bots?: boolean;
  rateLimit?: number;
  run: (context: CommandContext) => Promise<unknown>;
}

export interface Event {
  name: string;
  // TODO: types
  run: (context: any) => Promise<unknown>;
}

export interface CreateCommandOptions {
  aliases?: Command["aliases"];
  permissions?: Command["permissions"];
  bots?: boolean;
  rateLimit?: number;
}
