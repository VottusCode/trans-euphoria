import { Env, env } from "../../utils/env";
import { services } from "../../utils/container";
import { createEvent } from "../constructors";

export default createEvent("message", async (message) => {
  const { bot } = services();

  const prefix = env(Env.BOT_PREFIX);

  // Check whether the message starts with the command prefix.
  if (!message.content.startsWith(prefix)) return;

  console.log("[debug] starts with prefix");

  // Parses the args of the message.
  const args = message.content.slice(prefix.length).trim().split(" ");

  // Takes the first part of the args which is always the command name.
  // The shift() function removes the first item (in this case the command name)
  // from args and returns it.
  const commandName = args.shift();

  // The command context
  const ctx = { message, args };

  console.log("[debug]", { ctx, commandName });

  for (const command of bot.getCommands()) {
    // If the name doesn't match, skip
    if (command.name !== commandName) continue;

    console.log("[debug] command match", command);

    // Check if the command isn't disabled for bots
    // and the message author isn't a bot.
    if (command.bots && message.author.bot) return;

    console.log("[debug] botfuck verified");

    // If the command requires permissions, check for them.
    if (command.permissions) {
      const roleCache = message.member.roles.cache.array();

      // Whether the users needs all roles in the `permissions.roles` array
      // is determined by `permissions.every`.
      // This is not the best way of handling it, maybe find something beter.
      const can = command.permissions.roles[
        command.permissions.every ? "every" : "some"
      ]((id) => roleCache.some((r) => r.id === id));

      console.log("[debug] can", can);

      // Send a fail message
      if (!can) {
        return await message.channel.send(command.permissions.failMessage(ctx));
      }
    }

    // TODO: rate limiting

    // Run the command
    return await command.run(ctx);
  }

  return await message.reply("this command does not exist.");
});
