import { api } from "http/prefixes";
import { Controller } from "types";
import { auth } from "http/lifecycle/hooks";

const UserController: Controller = async (app, { db }) => {
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

  // TODO
  app.patch("/update", { preHandler: auth }, async (req, res) => {
    const user = await db.user.update({
      where: {
        // TODO: fix type
        id: (req.user as any).id,
      },
      data: req.body,
    });

    res.send({
      success: true,
      data: {
        // TODO: transform
        user: {
          ...user,
          guildId: undefined,
          verificationId: undefined,
        },
      },
    });
  });
};

export const routePrefix = api("user");

export default UserController;
