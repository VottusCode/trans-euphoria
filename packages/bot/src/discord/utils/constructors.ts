import type { Command, CreateCommandOptions, Event } from "../../types";
import type { ClientEvents } from "discord.js";

export const createCommand = (
  name: Command["name"],
  opts: CreateCommandOptions,
  run: Command["run"]
): Command => ({
  permissions: opts.permissions,
  aliases: opts.aliases ?? [],
  name,
  run,
});

export const createEvent = <T extends keyof ClientEvents>(
  trigger: T,
  run: Event<T>["run"]
): Event<T> => ({
  trigger,
  run,
});
