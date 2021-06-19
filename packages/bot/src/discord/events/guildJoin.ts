import { createEvent } from "discord/utils/constructors";
import { service } from "utils/container";

export default createEvent("guildCreate", async (guild) => {
  await service("bot").syncGuild(guild);
});
