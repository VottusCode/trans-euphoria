import { GuildMember, Message, TextChannel } from "discord.js";
import { User, Verification, VerificationState } from "@prisma/client";
import { services } from "../../utils/container";
import { bootstrapEmbed, EmbedColor, field } from "../../utils/embeds";
import { createVerifyChannel } from "./utils";

interface StartVerificationOptions {
  // At bot restart, all verify channels need to be rehooked
  rehook?: boolean;
  verifyChannel?: TextChannel;
  member: GuildMember;
  verification: Verification;
}

/**
 * Starts the verification process.
 *
 * @param opts Options
 */
export const startVerification = async ({
  member,
  rehook = false,
  verifyChannel,
  verification,
}: StartVerificationOptions) => {
  const { bot, db } = services();

  verifyChannel = verifyChannel
    ? verifyChannel
    : await createVerifyChannel(member.guild, member.user);

  // Update the user state
  verification = await db.verification.update({
    where: {
      id: verification.id,
    },
    data: {
      state: VerificationState.Verifying,
      channelId: verifyChannel.id,
      guildId: member.guild.id,
      answer: null,
    },
  });

  if (!rehook) {
    // TODO: better handling of embeds
    await verifyChannel.send(
      bootstrapEmbed()
        .setTitle(`Welcome to Trans Euphoria, ${member.user.username}`)
        .setDescription(
          "Please answer to these following questions to get you verified on this server."
        )
        .setThumbnail(member.user.avatarURL())
        .addFields([
          field("1. What's your name?", [
            "You don't need to specify your deadname.",
            "If you haven't decided on a name yet, that's fine too.",
          ]),
          field(
            "2. What's your gender?",
            "If you do not feel comfortable answering, answering 'Other' is fine."
          ),
          field("3. Are you trans?", "Questioning or ex-trans is fine too."),
          field(
            "4. Why did you join the server?",
            "What do you expect to find here?"
          ),
        ])
    );
  }

  let blocking = false;

  const handleMessage = async (message: Message) => {
    // If the handler is being blocked, return.
    if (blocking) return;

    // Checks whether the message is from the verification channel.
    if (message.channel.id !== verifyChannel.id) return;

    // Checks whether the message isn't from a bot or from a different user.
    if (message.author.bot || message.author.id !== member.user.id) return;

    // Make sure the answers cannot be sent while the database is still updaing
    // or another question is still sending
    blocking = true;

    // Run only if the answer wasn't sent already.
    if (!verification.answer) {
      // Save the answer
      verification = await db.verification.update({
        where: {
          id: verification.id,
        },
        data: {
          answer: message.content,
        },
      });

      await verifyChannel.send(
        bootstrapEmbed()
          .setTitle("Thank you.")
          .setDescription(
            "Thank you for answering the questions, staff will get back to you as soon as possible!"
          )
          .setColor(EmbedColor.GREEN)
      );
    }

    // Clear handler
    bot.off("message", handleMessage);

    // Unblock
    blocking = false;
  };

  bot.on("message", handleMessage);
};
