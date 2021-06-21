import { createEvent } from "../utils/constructors";
import { service } from "../../utils/container";

export default createEvent("guildMemberAdd", async (member) => {
  await service("bot").syncMember(member);
});
