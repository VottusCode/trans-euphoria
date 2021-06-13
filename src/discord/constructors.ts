import type { Command, CreateCommandOptions, Event } from "../types";

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

export const createEvent = (name: Event["name"], run: Event["run"]): Event => ({
  name,
  run,
});
