import { Message, MessageEmbed, StringResolvable } from "discord.js";
import { User, Verification, VerificationState } from "@prisma/client";
import { services } from "../../utils/container";

/**
 * Please excuse this mess of a code that you will read,
 * it was written late at night, I am aware of how trashy it is,
 * I may rewrite it soon.
 **/

interface StartVerificationOptions {
  message: Message;
  user: User & { verification: Verification };
}

// todo: make dynamic
export const QUESTIONS: StringResolvable[] = [
  ["What's your name?", "", "You don't need to specify your deadname."],
  ["What's your gender?"],
  ["Are you trans?", "", "Ex-trans and questioning is fine too!"],
  ["What are you here for?"],
];

export const startVerification = async ({
  message: originalMessage,
  user,
}: StartVerificationOptions) => {
  const verifiedUser = originalMessage.author;

  const { bot, db } = services();

  const verifyChannel = await originalMessage.guild.channels.create(
    `verification-${verifiedUser.username}`
  );

  verifyChannel.permissionOverwrites.user = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      verification: {
        update: {
          state: VerificationState.Verifying,
          channelId: verifyChannel.id,
          answer: null,
        },
      },
    },
    include: {
      verification: true,
    },
  });

  // TODO: better handling of embeds
  await verifyChannel.send(
    new MessageEmbed()
      .setTitle(`Welcome to Trans Euphoria, ${verifiedUser.username}`)
      .setDescription(
        "Please answer to these following questions to get you verified on this server."
      )
      .setColor("#ffc2cd")
      // TODO: improve version
      .setFooter(
        `Trans Euphoria ${new Date().getFullYear()} | v${
          require("../../../package.json").version
        }`,
        bot.user.avatarURL()
      )
      .setThumbnail(verifiedUser.avatarURL())
      .addFields([
        {
          name: "1. What's your name?",
          value: [
            "You don't need to specify your deadname.",
            "If you haven't decided on a name yet, that's fine too.",
          ].join("\n"),
        },
        {
          name: "2. What's your gender?",
          value:
            "If you do not feel comfortable answering, answering 'Other' is fine.",
        },
        {
          name: "3. Are you trans?",
          value: "Questioning or ex-trans is fine too.",
        },
      ])
  );

  let blocking = false;

  const handleMessage = async (message: Message) => {
    // If the handler is being blocked, return.
    if (blocking) return;

    // Checks whether the message is from the verification channel.
    if (message.channel.id !== verifyChannel.id) return;

    // Checks whether the message isn't from a bot or from a different user.
    if (message.author.bot || message.author.id !== verifiedUser.id) return;

    // Make sure the answers cannot be sent while the database is still updaing
    // or another question is still sending
    blocking = true;

    // Run only if the answer wasn't sent already.
    if (!user.verification.answer) {
      // Save the answer
      user = await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          verification: {
            update: {
              answer: message.content,
            },
          },
        },
        include: {
          verification: true,
        },
      });

      // Clear handler
      bot.off("message", handleMessage);

      await verifyChannel.send(
        new MessageEmbed()
          .setTitle("Thank you.")
          .setDescription(
            "Thank you for answering the questions, staff will get back to you as soon as possible!"
          )
          .setColor("GREEN")
          .setFooter(
            `Trans Euphoria ${new Date().getFullYear()} | v${
              require("../../../package.json").version
            }`,
            bot.user.avatarURL()
          )
      );
    }

    // Unblock
    blocking = false;
  };

  bot.on("message", handleMessage);
};
