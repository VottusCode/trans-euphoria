import { bold, redBright } from "chalk";

export class NoEnvFoundException extends Error {
  constructor(variable: string, message?: string) {
    super(
      message ?? redBright(`Environment variable ${bold(variable)} not found.`)
    );
  }
}
