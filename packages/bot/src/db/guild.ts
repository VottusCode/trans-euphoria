import { Guild } from "discord.js";
import { service } from "../utils/container";

export const createGuild = async (guild: Guild) =>
  service("db").guild.create({
    data: {
      id: guild.id,
      name: guild.name,
    },
  });

export const findGuild = async (guild: Guild | string) =>
  service("db").guild.findUnique({
    where: {
      id: typeof guild === "string" ? guild : guild.id,
    },
  });
