import { api } from "http/prefixes";
import { Controller } from "types";
import fastifyPassport from "fastify-passport";

const AuthController: Controller = async (app) => {
  app.get(
    "/authorize",
    { preValidation: fastifyPassport.authenticate("discord") },
    async (req, res) => {
      req.session.set("userId", (req.user! as any).id);

      res.send({
        success: true,
        data: {
          message: "ok",
        },
      });
    }
  );
};

export const routePrefix = api("auth");

export default AuthController;
