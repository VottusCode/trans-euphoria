import { PrismaClient } from "@prisma/client";
import {
  Message,
  Snowflake,
  StringResolvable,
  TextChannel,
  ClientEvents,
} from "discord.js";
import { Logger } from "winston";
import { EuphoriaClient } from "../discord/client";

export interface Container {
  db: PrismaClient;
  bot: EuphoriaClient;
  logger: Logger;
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
    every?: boolean;
    failMessage?: (context: CommandContext) => StringResolvable;
  };
  // default: false
  bots?: boolean;
  rateLimit?: number;
  run: (context: CommandContext) => Promise<unknown>;
}

export interface Event<T extends keyof ClientEvents> {
  trigger: T;
  // TODO: types
  run: (...ctx: ClientEvents[T]) => Promise<unknown>;
}

export interface CreateCommandOptions {
  aliases?: Command["aliases"];
  permissions?: Command["permissions"];
  bots?: boolean;
  rateLimit?: number;
}
