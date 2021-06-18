import { FasteerInstance } from "@fasteerjs/fasteer";
import { service } from "../../utils/container";
import { Env, env } from "../../utils/env";
import fastifyPassport from "fastify-passport";
import DiscordStrategy from "passport-discord";
import fastifySecureSession from "fastify-secure-session";
import { getSecret } from "../../utils/secret";
import fasteerExceptions, {
  createExceptionHandler,
  UnauthorizedException,
} from "@fasteerjs/exceptions";

export const sessions = (cookieSecretPath: string) => async (
  server: FasteerInstance
) => {
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
        callbackURL: env(Env.WEB_CALLBACK_URL),
        scope: ["identify"],
      },
      // We only use the discord strategy for authenticating once.
      async (_, __, profile, done) => {
        const user = await db.user.findFirst({
          where: {
            discordId: profile.id,
          },
        });

        if (!user) {
          done(
            new UnauthorizedException("This discord account is not registered.")
          );
        }

        done(null, user);
      }
    )
  );

  server.fastify.setErrorHandler(createExceptionHandler({}));

  fastifyPassport.registerUserSerializer(async (user: any) => user.id);

  fastifyPassport.registerUserDeserializer(
    async (id: string) => await db.user.findUnique({ where: { id } })
  );
};
