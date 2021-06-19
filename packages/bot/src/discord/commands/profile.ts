import { createCommand } from "discord/utils/constructors";
import { service } from "utils/container";
import { bootstrapEmbed, field } from "utils/embeds";
import { Env, env } from "utils/env";

export default createCommand("profile", {}, async ({ message }) => {
  const db = service("db");

  const user = await db.user.findUnique({
    where: {
      discordId: message.author.id,
    },
  });

  if (!user) return message.reply("an internal error has occurred.");

  return message.channel.send(
    bootstrapEmbed()
      .setTitle(user.username)
      .setDescription(user.about ?? "")
      .setThumbnail(message.author.avatarURL())
      .addFields([
        field("Gender", user.gender, true),
        field("Pronouns", user.pronouns, true),
        field("Sexuality", user.sexuality, true),
        field("Profile", `${env(Env.BASE_URL)}/profile/${user.id}`, true),
      ])
  );
});
