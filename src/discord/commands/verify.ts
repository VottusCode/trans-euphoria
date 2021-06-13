import { VerificationState } from "@prisma/client";
import { startVerification } from "../verification/start";
import { services } from "../../utils/container";
import { createCommand } from "../constructors";

export default createCommand(
  "verify",
  {
    permissions: {
      roles: [],
      every: true,
      failMessage: ({ message }) =>
        `${message.author.username}, you are already verified.`,
    },
    bots: false,
    rateLimit: 1 * 60 * 1000,
  },
  async ({ message }) => {
    const { db, bot } = services();

    // TODO: caching

    const user = await db.user.findUnique({
      where: {
        discordId: message.author.id,
      },
      include: {
        verification: true,
      },
    });

    if (!user) {
      // TODO: Create user if doesn't exist.
      return await message.reply("an internal error has occurred.");
    }

    // Check if the state is not Preverify, if the user is already verifying or is banned,
    // send them a notice. Other states are allowed (PreVerify, Denied - they can reapply.)
    if (user.verification.state !== VerificationState.PreVerify) {
      if (user.verification.state === VerificationState.Verifying) {
        return await message.reply(
          "you are already being verified. Please check the channel that's been created for you."
        );
      }

      if (user.verification.state === VerificationState.Denied_Permanent) {
        return await message.reply(
          "you are unable to verify again. Please contact staff for more details."
        );
      }
    }

    startVerification({
      message,
      user,
    });
  }
);
