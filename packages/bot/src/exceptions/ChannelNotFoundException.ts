import { bold, redBright } from "chalk";

export class ChannelNotFoundException extends Error {
  constructor(channel: string, message?: string) {
    super(
      message ??
        redBright(`Channel/Category with id/name ${bold(channel)} not found.`)
    );
  }
}
