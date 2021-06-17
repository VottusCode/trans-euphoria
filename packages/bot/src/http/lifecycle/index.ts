import { FasteerInstance } from "@fasteerjs/fasteer";
import fastifyStatic from "fastify-static";

export const lifecycle =
  (staticPath: string) => async (app: FasteerInstance) => {
    app.fastify.register(fastifyStatic, {
      root: staticPath,
    });

    app.fastify.setNotFoundHandler((req, res) => {
      // API 404
      if (req.raw.url && req.raw.url.startsWith("/api")) {
        return res.status(404).send({
          success: false,
          error: {
            kind: "user_input",
            message: "Not Found",
          },
        }); // default handler
      }

      // Vue SPA
      res.status(200).sendFile("index.html");
    });

    // TODO
  };
