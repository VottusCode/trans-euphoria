import { FasteerInstance } from "@fasteerjs/fasteer";
import fastifyStatic from "fastify-static";

export const lifecycle =
  (staticPath: string) => async (app: FasteerInstance) => {
    app.fastify.register(fastifyStatic, {
      root: staticPath,
    });

    // TODO
  };
