import { User } from ".prisma/client";
import { Guild } from "discord.js";
import { service } from "../utils/container";

export const createUserVerification = async (
  user: User | string,
  guild: Guild | string
) => {
  return service("db").user.update({
    where: {
      id: typeof user === "string" ? user : user.id,
    },
    data: {
      verifications: {
        create: [
          {
            answer: null,
            guildId: typeof guild === "string" ? guild : guild.id,
          },
        ],
      },
    },
    include: {
      verifications: true,
    },
  });
};
