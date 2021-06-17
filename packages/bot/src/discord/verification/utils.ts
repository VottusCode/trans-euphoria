import { Guild, User } from "discord.js";
import { ChannelNotFoundException } from "../../exceptions/ChannelNotFoundException";
import { RoleNotFoundException } from "../../exceptions/RoleNotFoundException";
import { Env, env } from "../../utils/env";

/**
 * Creates the verification channel.
 *
 * @param guild Guild in which the channel should be crated.
 * @param user User to verify.
 * @returns The channel.
 */
export const createVerifyChannel = async (guild: Guild, user: User) => {
  const adminVerifyRoleId = env(Env.ADMIN_VERIFY_ROLE_ID);

  const adminVerifyRole = await (
    await guild.roles.fetch()
  ).find((r) => r.id === adminVerifyRoleId);

  if (!adminVerifyRole) {
    throw new RoleNotFoundException(adminVerifyRoleId);
  }

  const verifyCategoryId = env(Env.VERIFY_CATEGORY_ID);

  const verifyCategory = (await guild.channels.fetch()).find(
    (c) => c.type === "category" && c.id === verifyCategoryId
  );

  if (!verifyCategory) {
    throw new ChannelNotFoundException(verifyCategoryId);
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
