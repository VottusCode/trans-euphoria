import { EuphoriaClient } from "./discord/client";
import { dev, Env, env, ver } from "./utils/env";
import { registerContainerServices } from "@matherioneu/container";
import { PrismaClient } from "@prisma/client";
import { createLogger } from "winston";
import { createLoggerOptions, createFasteer } from "@fasteerjs/fasteer";
import { rainbow } from "./utils/chalk";
import { bold, cyanBright, magenta, whiteBright } from "chalk";
import { services } from "./utils/container";
import path from "path";
import { lifecycle } from "./http/lifecycle";
import { sessions } from "./http/lifecycle/sessions";

// Path to all controllers.
// prettier-ignore
const CONTROLLERS_DIRECTORY = path.join(__dirname, "http", "controllers", "**", "*.ts");

// Path to the cookie secret used to sign cookies.
// i swear to fucking god im going to kill prettier someday
// prettier-ignore
const COOKIE_SECRET_PATH = path.join(__dirname, "..", "..", "..", "cookie_key.secret");

// Path to the public directory served by fastify-static.
// If you're looking to adding a public file, don't put it in dist
// as it is cleaned up by Vite on frontend build, use the frontend/public
// folder instead.
const PUBLIC_DIRECTORY = path.join(__dirname, "..", "..", "frontend", "dist");

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

  // Register the bot in as a service
  registerContainerServices({ bot });

  // Create the webserver
  const server = createFasteer({
    controllers: CONTROLLERS_DIRECTORY,
    port: env(Env.PORT, "4200"),
    host: env(Env.HOST, "127.0.0.1"),
    cors: {
      origin: env(Env.CORS, "127.0.0.1:3001"),
      credentials: true,
    },
    helmet: {
      //temp
      contentSecurityPolicy: false,
    },
  });

  server.logger = logger;

  server
    // Request lifecycle
    .plugin(lifecycle(PUBLIC_DIRECTORY))
    // Passport & sessions
    .plugin(sessions(COOKIE_SECRET_PATH));

  registerContainerServices({ server });

  // Inject all container serices
  server.inject(services());

  // Once the bot has started, start the webserver
  bot.on("euphoriaReady", async () => {
    const addr = await server.start();
    logger.info(cyanBright(`Webserver started! URL: ${bold(addr)}`));
  });
};
