import { api } from "http/prefixes";
import { Controller } from "types";
import { auth } from "http/lifecycle/hooks";
import s from "fluent-json-schema";

const UserController: Controller = async (app, { db }) => {
  app.get("/me", { preHandler: auth }, async (req, res) => {
    res.send({
      success: true,
      data: {
        // TODO: transform
        account: {
          ...req.user,
          guildId: undefined,
          verificationId: undefined,
        },
      },
    });
  });

  // TODO
  app.patch(
    "/me",
    {
      preHandler: auth,
      schema: s
        .object()
        .prop(
          "body",
          s
            .object()
            .prop("username", s.string().maxLength(32))
            .prop("gender", s.enum(["Male", "Female", "Non Binary", "Other"]))
            .prop(
              "pronouns",
              s.enum([
                "he/him/his/his/himself",
                "she/her/her/hers/herself",
                "they/them/their/theirs/themselves",
                "other",
              ])
            )
            .prop(
              "sexuality",
              s.enum([
                "Straight",
                "Gay/Lesbian",
                "Bisexual",
                "Pansexual",
                "Asexual",
                "Other",
              ])
            )
            .prop("about", s.string().maxLength(255))
        )
        .valueOf(),
    },
    async (req, res) => {
      await db.user.update({
        where: {
          id: req.user.user.id,
        },
        data: req.body,
      });

      res.send({
        success: true,
        data: {
          message: "ok",
        },
      });
    }
  );
};

export const routePrefix = api("user");

export default UserController;
