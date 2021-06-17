import { api } from "http/prefixes";
import { Controller } from "types";
import { auth } from "http/lifecycle/hooks";

const UserController: Controller = async (app) => {
  app.get("/me", { preHandler: auth }, async (req, res) => {
    res.send({
      success: true,
      data: {
        // TODO: transform
        user: {
          ...req.user,
          guildId: undefined,
          verificationId: undefined,
        },
      },
    });
  });
};

export const routePrefix = api("user");

export default UserController;
