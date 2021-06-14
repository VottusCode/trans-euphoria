import { VerificationState } from "@prisma/client";
import { service } from "../../utils/container";
import { bootstrapEmbed, EmbedColor } from "../../utils/embeds";
import { env, Env } from "../../utils/env";
import { createCommand } from "../constructors";

export default createCommand(
  "verifyAdmin",
  {
    permissions: {
      roles: ["853889737890201652"],
      every: true,
    },
    bots: false,
  },
  async ({ message, args: [action], prefix }) => {
    const db = service("db");

    if (!action || !["approve", "deny", "ban"].includes(action.toLowerCase())) {
      return await message.reply(
        `the correct usage is \`${prefix}verifyAdmin [approve/deny/ban]\``
      );
    }

    // Lowercase the action for case-insentivity
    action = action.toLowerCase();

    const verifiedUser = await db.user.findFirst({
      where: {
        verification: {
          channelId: message.channel.id,
        },
      },
      include: {
        verification: true,
      },
    });

    if (!verifiedUser) {
      return await message.reply("this channel is not a verification channel.");
    }

    if (verifiedUser.verification.state !== VerificationState.Verifying) {
      return await message.reply("this user is not currently being verified.");
    }

    const discordUser = (await message.guild.members.fetch()).find(
      (g) => g.user.id === verifiedUser.discordId
    );

    if (!discordUser) {
      return await message.reply("this user has already left the guild.");
    }

    const newState = {
      approve: VerificationState.Approved,
      deny: VerificationState.Denied,
      ban: VerificationState.Denied_Permanent,
    }[action];

    await db.verification.update({
      where: {
        id: verifiedUser.verification.id,
      },
      data: {
        state: newState,
        channelId: null,
      },
    });

    if (action === "approve") {
      await message.channel.send(
        bootstrapEmbed()
          .setTitle("Application Approved")
          .setDescription(
            "Your application has been approved, welcome to Trans Euphoria!"
          )
          .setColor(EmbedColor.GREEN)
      );

      await discordUser.roles.remove(env(Env.ROLE_UNVERIFIED_ROLE_ID));
    }

    if (action === "deny" || action === "ban") {
      await message.channel.send(
        bootstrapEmbed()
          .setTitle("Application Denied")
          .setDescription(
            "Your application has been denied, for more details please contact staff."
          )
          .setColor(EmbedColor.RED)
      );
    }

    await message.channel.send(
      bootstrapEmbed()
        .setTitle("Deleting this channel...")
        .setDescription("This channel will be deleted in 10s.")
        .setColor(EmbedColor.ORANGE)
    );

    await new Promise((resolve) =>
      setTimeout(async () => {
        resolve(await message.channel.delete());
      }, 10 * 1000)
    );
  }
);
