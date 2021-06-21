import { createEvent } from "../utils/constructors";
import { service } from "../../utils/container";

export default createEvent("guildCreate", async (guild) => {
  await service("bot").syncGuild(guild);
});
