import { api } from "../../prefixes";
import { Controller } from "../../../types";
import { auth } from "../../lifecycle/hooks";
import s from "fluent-json-schema";
import { NotFoundException } from "@fasteerjs/exceptions";

const UserController: Controller = async (app, { db }) => {
  app.get<{ Params: { id: string } }>(
    "/:id",
    {
      schema: s
        .object()
        .prop("params", s.object().prop("id", s.string()))
        .valueOf(),
    },
    async (req, res) => {
      const user = await db.user.findUnique({
        where: {
          id: req.params.id,
        },
        include: {
          discordAccount: true,
        },
      });

      if (!user) throw new NotFoundException("User not found");

      res.send({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.username,
            gender: user.gender,
            pronouns: user.pronouns,
            sexuality: user.sexuality,
            about: user.about,
            avatar: user.discordAccount.avatarId,
            discordId: user.discordAccount.id,
          },
        },
      });
    }
  );
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
