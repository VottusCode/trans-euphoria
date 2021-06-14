import { EuphoriaClient } from "./discord/client";
import { dev, Env, env, ver } from "./utils/env";
import { registerContainerServices } from "@matherioneu/container";
import { PrismaClient } from "@prisma/client";
import { createLogger } from "winston";
import { createLoggerOptions } from "@fasteerjs/fasteer";
import { rainbow } from "./utils/chalk";
import { magenta, whiteBright } from "chalk";

export const start = async () => {
  const db = new PrismaClient();
  const logger = createLogger(
    createLoggerOptions({
      consoleLogging: {
        logErrors: dev(),
      },
    })
  );

  // Start
  logger.info(magenta.bold(`Starting ${rainbow("Euphoria")} bot v${ver}`));

  // Notice
  logger.info(
    whiteBright(
      "This bot is provided as is, without any warranty and/or support."
    )
  );
  logger.info(
    whiteBright(
      "Authors are not liable for any damages done by running this bot. Run at your own risk."
    )
  );
  logger.info("");

  // Registering other services before the bot so it has access
  // so the bot has access to them.
  registerContainerServices({
    db,
    logger,
  });

  const bot = new EuphoriaClient(env(Env.BOT_TOKEN));
  await bot.start();

  registerContainerServices({ bot });
};
