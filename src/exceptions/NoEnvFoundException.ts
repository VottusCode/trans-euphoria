export class NoEnvFoundException extends Error {
  constructor(variable: string, message?: string) {
    super(message ?? `Environment variable ${variable} not found.`);
  }
}
