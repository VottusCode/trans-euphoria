import { EmbedField, MessageEmbed, StringResolvable } from "discord.js";
import { service } from "../../utils/container";
import { ver } from "../../utils/env";

export enum EmbedColor {
  PINK = "#ffc2cd",
  GREEN = "GREEN",
  RED = "RED",
  ORANGE = "ORANGE",
}

export const bootstrapEmbed = (embed?: MessageEmbed) => {
  const bot = service("bot");

  return (
    (embed ? embed : new MessageEmbed())
      .setFooter(
        `Trans Euphoria ${new Date().getFullYear()} | v${ver}`,
        bot.user.avatarURL()
      )
      // By default the color is pink (= primary), which can be overwritten by calling
      // setColor again.
      .setColor(EmbedColor.PINK)
  );
};

export const noPermEmbed = (
  title = "Missing permissions",
  description = "You are not allowed to perform this action."
) =>
  bootstrapEmbed()
    .setTitle(title)
    .setColor(EmbedColor.RED)
    .setDescription(description);

export const field = (
  name: string,
  value: StringResolvable,
  inline = false,
  joiner = "\n"
): EmbedField => ({
  name,
  value: Array.isArray(value) ? value.join(joiner) : value,
  inline,
});
