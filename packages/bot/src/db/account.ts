import { resolveUser, UserResolvable } from "../discord/utils/users";
import { service } from "../utils/container";

export const createAccount = async (userResolvable: UserResolvable) => {
  const db = service("db");
  const usr = await resolveUser(userResolvable);

  return await db.discordAccount.create({
    data: {
      id: usr.id,
      username: usr.username,
      discriminator: usr.discriminator,
      avatarId: usr.avatar,
      user: {
        create: {
          username: usr.username,
        },
      },
    },
    include: {
      user: true,
    },
  });
};

export const syncAccount = async (userResolvable: UserResolvable) => {
  const db = service("db");
  const usr = await resolveUser(userResolvable);

  // TODO: sync current guilds

  return await db.discordAccount.update({
    where: {
      id: usr.id,
    },
    data: {
      username: usr.username,
      discriminator: usr.discriminator,
      avatarId: usr.avatar,
    },
  });
};

export const findAccount = async (userResolvable: UserResolvable) => {
  const db = service("db");

  return await db.discordAccount.findUnique({
    where: {
      id:
        typeof userResolvable === "string" ? userResolvable : userResolvable.id,
    },
  });
};
