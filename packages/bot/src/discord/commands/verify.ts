import { VerificationState } from "@prisma/client";
import { startVerification } from "../verification/start";
import { service, services } from "../../utils/container";
import { createCommand } from "../utils/constructors";
import { createUserVerification } from "../../db/user";

export default createCommand(
  "verify",
  {
    permissions: {
      verify: async (ctx) => {
        let user = await service("db").user.findUnique({
          where: {
            discordId: ctx.message.author.id,
          },
          include: {
            verifications: {
              where: {
                guildId: ctx.message.guild.id,
              },
            },
          },
        });

        // User doesn't exist. WHA?
        if (!user) return false;

        // User does not have a verification on this guild yet, create one.
        if (user.verifications.length < 1) {
          user = await createUserVerification(user, ctx.message.guild);
        }

        return true;
      },
      failMessage: ({ message }) =>
        `${message.author.username}, you are already verified/being verified.`,
    },
    bots: false,
    rateLimit: 1 * 60 * 1000,
  },
  async ({ message }) => {
    const { db } = services();

    let user = await db.user.findUnique({
      where: {
        discordId: message.author.id,
      },
      include: {
        verifications: {
          where: {
            guildId: message.guild.id,
          },
        },
      },
    });

    const verification = user.verifications[0];

    // Check if the state is not Preverify, if the user is already verifying or is banned,
    // send them a notice. Other states are allowed (PreVerify, Denied - they can reapply.)
    if (verification.state !== VerificationState.PreVerify) {
      if (verification.state === VerificationState.Approved) {
        return await message.reply("you have already been verified!");
      }

      if (verification.state === VerificationState.Verifying) {
        return await message.reply(
          "you are already being verified. Please check the channel that's been created for you."
        );
      }

      if (verification.state === VerificationState.Denied_Permanent) {
        return await message.reply(
          "you are unable to verify again. Please contact staff for more details."
        );
      }
    }

    startVerification({
      member: message.member,
      verification,
      rehook: false,
    });
  }
);
