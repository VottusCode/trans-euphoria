import { FasteerInstance } from "@fasteerjs/fasteer";
import { service } from "../../utils/container";
import { Env, env } from "../../utils/env";
import fastifyPassport from "fastify-passport";
import DiscordStrategy from "passport-discord";
import fastifySecureSession from "fastify-secure-session";
import { getSecret } from "../../utils/secret";
import {
  createExceptionHandler,
  UnauthorizedException,
} from "@fasteerjs/exceptions";

export const sessions =
  (cookieSecretPath: string) => async (server: FasteerInstance) => {
    server.fastify.register(fastifySecureSession, {
      key: getSecret(cookieSecretPath),
      cookieName: "_euphoria_session",
      cookie: {
        // todo: enabled based on https
        sameSite: false,
        path: "/",
      },
    });

    server.fastify.register(fastifyPassport.initialize());
    server.fastify.register(fastifyPassport.secureSession());

    const db = service("db");

    fastifyPassport.use(
      "discord",
      new DiscordStrategy(
        {
          clientID: env(Env.CLIENT_ID),
          clientSecret: env(Env.CLIENT_SECRET),
          callbackURL: `${env(Env.BASE_URL)}/dashboard/login`,
          scope: ["identify"],
        },
        // We only use the discord strategy for authenticating once.
        async (_, __, profile, done) => {
          let account = await db.discordAccount.findFirst({
            where: {
              id: profile.id,
            },
            include: {
              user: true,
            },
          });

          if (!account || !account.user) {
            return done(
              new UnauthorizedException(
                "This discord account is not registered."
              )
            );
          }

          account = await db.discordAccount.update({
            where: {
              id: profile.id,
            },
            data: {
              username: profile.username,
              discriminator: profile.discriminator,
              avatarId: profile.avatar,
            },
            include: {
              user: true,
            },
          });

          done(null, account);
        }
      )
    );

    server.fastify.setErrorHandler(createExceptionHandler({}));

    fastifyPassport.registerUserSerializer(async (user: any) => user.id);

    fastifyPassport.registerUserDeserializer(
      async (id: string) =>
        await db.discordAccount.findUnique({
          where: { id },
          include: { user: true },
        })
    );
  };
