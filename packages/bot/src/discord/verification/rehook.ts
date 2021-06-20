import { VerificationState } from "@prisma/client";
import { TextChannel } from "discord.js";
import { services } from "../../utils/container";
import { startVerification } from "./start";
import { createVerifyChannel } from "./utils";

export const rehookVerification = async () => {
  const { db, bot } = services();

  // Fetch all users that are already in the verifying state
  // however only those without a filled out answer.
  const users = await db.user.findMany({
    where: {
      verifications: {
        every: {
          state: VerificationState.Verifying,
          answer: null,
        },
      },
    },
    include: {
      verifications: true,
    },
  });

  for (const user of users) {
    for (const verification of user.verifications) {
      const guild = await bot.guilds.fetch(verification.guildId);

      // The user comes from a guild that the bot is no longer on, ignore.
      if (!guild) continue;

      const member = await guild.members.fetch(user.discordId);

      // The user has already let the guild, ignore.
      if (!member) continue;

      // If the verify channel is specified, find it in the guild's channels,
      // otherwise return null
      let verifyChannel = verification.channelId
        ? await guild.channels.fetch(verification.channelId)
        : null;

      // Create a new verify channel if it doesn't exist yet or
      // if the specified channel is not a text channel.
      if (!verifyChannel || !verifyChannel.isText()) {
        verifyChannel = await createVerifyChannel(guild, member.user);
      }

      // Call the startVerification function, however also pass rehook
      // to indicate that the verification has already started, only the listener
      // needs to be rehooked.
      startVerification({
        verifyChannel: verifyChannel as TextChannel,
        member,
        verification,
        rehook: true,
      });
    }
  }
};
