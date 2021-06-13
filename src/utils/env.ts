import { NoEnvFoundException } from "../exceptions/NoEnvFoundException";
import { config as configEnv } from "dotenv";

configEnv();

export enum Env {
  BOT_TOKEN = "BOT_TOKEN",
  CLIENT_ID = "CLIENT_ID",
  DATABASE_URL = "DATABASE_URL",
  BOT_PREFIX = "BOT_PREFIX",
  ROLE_UNVERIFIED_ID = "ROLE_UNVERIFIED_ID",
  NODE_ENV = "NODE_ENV",
}

export enum Environment {
  DEV = "development",
  PROD = "production",
}

export const env = (variable: Env): string => {
  const val = process.env[variable];

  if (!val) {
    throw new NoEnvFoundException(variable);
  }

  return val;
};

export const dev = () => env(Env.NODE_ENV) === "development";
