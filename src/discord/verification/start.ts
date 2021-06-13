import type { Message, StringResolvable } from "discord.js";
import { Prisma, User, Verification, VerificationState } from "@prisma/client";
import { services } from "utils/container";
import slugify from "slugify";

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
    slugify(`Verification${verifiedUser.username}`)
  );

  user = await db.user.update({
    where: {
      id: user.verificationId,
    },
    data: {
      verification: {
        update: {
          state: VerificationState.Verifying,
          channelId: verifyChannel.id,
          questions: [],
        },
      },
    },
    include: {
      verification: true,
    },
  });

  verifyChannel.send(`**1. ${QUESTIONS[0]}**`);

  let blocking = false;

  const handleMessage = async (message: Message) => {
    // Checks whether the message is from the verification channel.
    if (message.channel.id !== verifyChannel.id) return;

    // Checks whether the message isn't from a bot or from a different user.
    if (message.author.bot || message.author.id !== verifiedUser.id) return;

    // Make sure the answers cannot be sent while the database is still updaing
    // or another question is still sending
    blocking = true;

    let questionsArr: Prisma.JsonArray = user.verification
      .questions as Prisma.JsonArray;

    // Run only if there's less QA's in the array than there is actual questions
    if (questionsArr.length < QUESTIONS.length) {
      // Save the answer
      user = await db.user.update({
        where: {
          id: user.verificationId,
        },
        data: {
          verification: {
            update: {
              questions: [
                ...questionsArr,
                {
                  q: QUESTIONS[questionsArr.length - 1],
                  a: message.content,
                },
              ],
            },
          },
        },
        include: {
          verification: true,
        },
      });

      // Assigns the new questions
      questionsArr = user.verification.questions as Prisma.JsonArray;

      // Checks whether all questions have been filled now
      if (questionsArr.length >= user.verification.questions) {
        return bot.off("message", handleMessage);
      }

      // If there are questions left, ask them
      verifyChannel.send(
        `**${questionsArr.length + 1}. ${QUESTIONS[questionsArr.length - 1]}**`
      );
    }
  };

  bot.on("message", handleMessage);
};
