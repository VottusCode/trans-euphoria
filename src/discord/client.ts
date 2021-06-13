import { bold, greenBright, yellow } from "chalk";
import { Client } from "discord.js-light";
import { sync as glob } from "glob";
import path from "path";
import { Command, Event } from "../types";
import { Env, env } from "../utils/env";
import { inviteUrl } from "../utils/invite";

export class EuphoriaClient extends Client {
  private commands: Command[] = [];

  constructor(private _token: string) {
    super();
  }

  public async start() {
    this.on("ready", async () => {
      console.log(
        `Bot ready! ${this.user.username}#${this.user.discriminator}`
      );
      console.log(`Invite: ${inviteUrl(env(Env.CLIENT_ID))}`);
    });

    await this.loadCommands();
    await this.loadEvents();
    await this.login(this._token);
  }

  private async loadEvents() {
    const events = glob(path.join(__dirname, "events", "*.{ts,js}"));

    for (const event of events) {
      const evt: { default?: Event<any> } = await import(event);

      if (!evt.default) {
        console.warn(
          yellow(
            `Event ${bold(
              path.parse(event)
            )} does not have a default export. Skipping`
          )
        );
      }

      this.on(evt.default.trigger, evt.default.run);
    }

    console.log(
      greenBright(`Registered ${this.commands.length} event listeners`)
    );
  }

  private async loadCommands() {
    const commands = glob(path.join(__dirname, "commands", "*.{ts,js}"));

    for (const command of commands) {
      const cmd: { default?: Command } = await import(command);

      if (!cmd.default) {
        console.warn(
          yellow(
            `Command ${bold(
              path.parse(command)
            )} does not have a default export. Skipping`
          )
        );
      }

      this.commands.push(cmd.default);
    }

    console.log(greenBright(`Registered ${this.commands.length} commands`));
  }

  public getCommands() {
    return this.commands;
  }
}
