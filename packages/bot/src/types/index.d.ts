import { Fasteer, FasteerInstance } from "@fasteerjs/fasteer";
import { DiscordAccount, PrismaClient, User } from "@prisma/client";
import {
  Message,
  Snowflake,
  StringResolvable,
  TextChannel,
  ClientEvents,
} from "discord.js";
import { Logger } from "winston";
import { EuphoriaClient } from "../discord/client";
import { FastifyInstance } from "fastify";

export interface Container {
  db: PrismaClient;
  bot: EuphoriaClient;
  server: FasteerInstance;
  logger: Logger;
}

export interface CommandContext {
  args: string[];
  message: Message;
  command: string;
  prefix: string;
}

export interface Command {
  name: string;
  aliases: string[];
  permissions?: {
    verify: (context: CommandContext) => Promise<boolean>;
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

export type Controller = Fasteer.FCtrl<FastifyInstance, {}, Container>;

declare module "fastify-passport" {
  export interface PassportUser extends User {
    discordAccount: DiscordAccount;
  }
}
