import { FasteerInstance } from "@fasteerjs/fasteer";
import { service } from "../../utils/container";
import { Env, env } from "../../utils/env";
import fastifyPassport from "fastify-passport";
import DiscordStrategy from "passport-discord";
import fastifySecureSession from "fastify-secure-session";
import { getSecret } from "../../utils/secret";

export const sessions =
  (cookieSecretPath: string) => async (server: FasteerInstance) => {
    server.fastify.register(fastifySecureSession, {
      key: getSecret(cookieSecretPath),
      cookieName: "_euphoria_session",
    });

    server.fastify.register(fastifyPassport.initialize());
    server.fastify.register(fastifyPassport.secureSession());

    const db = service("db");

    fastifyPassport.use(
      new DiscordStrategy(
        {
          clientID: env(Env.CLIENT_ID),
          clientSecret: env(Env.CLIENT_SECRET),
          callbackURL: env(Env.CALLBACK_URL),
        },
        // We only use the discord strategy for authenticating once.
        async (_, __, profile, done) => {
          const user = await db.user.findFirst({
            where: {
              discordId: profile.id,
            },
          });

          if (!user) {
            done(new Error("This discord account is not registered."));
          }

          done(null, user);
        }
      )
    );

    fastifyPassport.registerUserSerializer(async (user: any) => user.id);

    fastifyPassport.registerUserDeserializer(
      async (id: string) => await db.user.findUnique({ where: { id } })
    );
  };
