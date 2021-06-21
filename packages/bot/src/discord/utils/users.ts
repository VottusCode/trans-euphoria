import { GuildMember, Snowflake, User as DiscordUser } from "discord.js";
import { service } from "../../utils/container";

export type UserResolvable = GuildMember | DiscordUser | Snowflake;

/**
 * Resolves a user.
 *
 * @param {UserResolvable} user
 * @returns The Discord User
 */
export const resolveUser = async (
  user: UserResolvable
): Promise<DiscordUser> => {
  return typeof user === "string"
    ? await service("bot").users.fetch(user)
    : user instanceof GuildMember
    ? user.user
    : user;
};
