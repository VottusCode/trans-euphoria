import { bold, redBright } from "chalk";

export class RoleNotFoundException extends Error {
  constructor(role: string, message?: string) {
    super(message ?? redBright(`Role by id/name ${bold(role)} not found.`));
  }
}
