import { EuphoriaClient } from "./discord/client";
import { env } from "./utils/env";
import { registerContainerServices } from "@matherioneu/container";
import { PrismaClient } from "@prisma/client";

export const start = async () => {
  const db = new PrismaClient();

  const bot = new EuphoriaClient(env("BOT_TOKEN"));
  await bot.start();

  registerContainerServices({
    bot,
    db,
  });
};
