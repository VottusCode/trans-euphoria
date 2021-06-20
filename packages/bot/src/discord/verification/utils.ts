import { findGuild } from "db/guild";
import { Guild, User } from "discord.js";
import { ChannelNotFoundException } from "../../exceptions/ChannelNotFoundException";
import { RoleNotFoundException } from "../../exceptions/RoleNotFoundException";

/**
 * Creates the verification channel.
 *
 * @param guild Guild in which the channel should be crated.
 * @param user User to verify.
 * @returns The channel.
 */
export const createVerifyChannel = async (guild: Guild, user: User) => {
  const dbGuild = await findGuild(guild);

  const adminVerifyRole = await (
    await guild.roles.fetch()
  ).find((r) => r.id === dbGuild.verifyRoleId);

  if (!adminVerifyRole) {
    throw new RoleNotFoundException(dbGuild.verifyRoleId);
  }

  const verifyCategory = (await guild.channels.fetch()).find(
    (c) => c.type === "category" && c.id === dbGuild.verifiedCategoryId
  );

  if (!verifyCategory) {
    throw new ChannelNotFoundException(dbGuild.verifiedCategoryId);
  }

  return await guild.channels.create(`verify-${user.username}`, {
    type: "text",
    permissionOverwrites: [
      {
        id: guild.roles.everyone,
        deny: ["VIEW_CHANNEL"],
      },
      {
        id: user.id,
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
      },
      {
        id: adminVerifyRole.id,
        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
      },
    ],
    parent: verifyCategory,
  });
};
