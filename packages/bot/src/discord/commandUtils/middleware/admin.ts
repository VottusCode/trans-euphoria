import { Command } from "../../../types";
import { service } from "../../../utils/container";

export const isAdmin: Command["permissions"]["verify"] = async (ctx) => {
  const guild = await service("db").guild.findUnique({
    where: {
      id: ctx.message.guild.id,
    },
  });

  if (!guild) return false;

  return ctx.message.member.roles.cache.some(
    (r) => r.id === guild.verifyRoleId
  );
};
