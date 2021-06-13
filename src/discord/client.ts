import { Client } from "discord.js-light";

export class EuphoriaClient extends Client {
  constructor(private _token: string) {
    super();
  }

  public async start() {
    await this.loadEvents();
    await this.loadCommands();
    await this.login(this._token);
  }

  private async loadCommands() {}

  private async loadEvents() {}
}
