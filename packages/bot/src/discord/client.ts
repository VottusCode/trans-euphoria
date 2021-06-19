import { bold, cyanBright, greenBright, yellow } from "chalk";
import { createAccount, findAccount, syncAccount } from "db/account";
import { Client } from "discord.js-light";
import { sync as glob } from "glob";
import path from "path";
import { Logger } from "winston";
import { Command, Event } from "types";
import { service, services } from "utils/container";
import { Env, env } from "utils/env";
import { inviteUrl } from "utils/invite";
import { rehookVerification } from "discord/verification/rehook";
import { createGuild, findGuild } from "db/guild";
import { createUserVerification } from "db/user";

// Event overrides:
// ready -> euphoriaReady
export class EuphoriaClient extends Client {
  private commands: Command[] = [];

  public logger: Logger;

  public isReady: boolean;

  constructor(private _token: string) {
    super();

    const { logger } = services();
    this.logger = logger;
  }

  public async start() {
    this.on("ready", async () => {
      this.logger.info(
        greenBright(
          `Logged in as ${bold(
            `${this.user.username}#${this.user.discriminator}`
          )}`
        )
      );

      await this.syncWithDatabase();
      await rehookVerification();
      await this.loadCommands();
      await this.loadEvents();

      this.emit("euphoriaReady");
    });

    this.on("euphoriaReady", async () => {
      this.isReady = true;

      this.logger.info("");
      this.logger.info(
        cyanBright(`Bot ready! Invite: ${bold(inviteUrl(env(Env.CLIENT_ID)))}`)
      );
    });

    await this.login(this._token);
  }

  private async syncWithDatabase() {
    const db = service("db");

    this.logger.info("");
    this.logger.info("Syncing guilds & users, this may take a while.");

    const guilds = await (await this.guilds.fetch()).array();

    // it looks nice... i had to
    let memberCount = 0;

    for (const guild of guilds) {
      let dbGuild = await findGuild(guild);

      if (!dbGuild) {
        dbGuild = await createGuild(guild);
      }

      const members = await (await guild.members.fetch()).array();

      // Increments the memberCount for the debug output
      memberCount = memberCount + members.length;

      for (const member of members) {
        // Skip bots...
        if (member.user.bot) continue;

        let account = await findAccount(member);

        // If use doesn't exist, create a new one.
        if (!account) {
          account = await createAccount(member);
          continue;
        }

        // Sync account with current data
        await syncAccount(member);
      }
    }

    this.logger.info(
      greenBright(
        `Synced ${bold(memberCount)} user(s) across ${bold(
          guilds.length
        )} guild(s)`
      )
    );
    this.logger.info("");

    // todo
  }

  private async loadEvents() {
    const events = glob(path.join(__dirname, "events", "*.{ts,js}"));

    for (const event of events) {
      const evt: { default?: Event<any> } = await import(event);

      if (!evt.default) {
        this.logger.warn(
          yellow(
            `Event ${bold(
              path.parse(event)
            )} does not have a default export. Skipping`
          )
        );
      }

      this.on(evt.default.trigger, evt.default.run);
    }

    this.logger.info(
      greenBright(`Registered ${this.commands.length} event listener(s)`)
    );
  }

  private async loadCommands() {
    const commands = glob(path.join(__dirname, "commands", "*.{ts,js}"));

    for (const command of commands) {
      const cmd: { default?: Command } = await import(command);

      if (!cmd.default) {
        this.logger.warn(
          yellow(
            `Command ${bold(
              path.parse(command)
            )} does not have a default export. Skipping`
          )
        );
      }

      this.commands.push(cmd.default);
    }

    this.logger.info(
      greenBright(`Registered ${this.commands.length} command(s)`)
    );
  }

  public getCommands() {
    return this.commands;
  }
}
