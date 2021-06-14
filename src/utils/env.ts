import { NoEnvFoundException } from "../exceptions/NoEnvFoundException";
import { config as configEnv } from "dotenv";

configEnv();

export enum Env {
  // Node environment = development/production
  NODE_ENV = "NODE_ENV",
  // The discord bot token
  BOT_TOKEN = "BOT_TOKEN",
  // The discord client id
  CLIENT_ID = "CLIENT_ID",
  // The database url
  DATABASE_URL = "DATABASE_URL",
  // The bot prefix
  BOT_PREFIX = "BOT_PREFIX",
  // The role for unverified users
  ROLE_UNVERIFIED_ROLE_ID = "ROLE_UNVERIFIED_ROLE_ID",
  // The role for users that are able to verify others
  ADMIN_VERIFY_ROLE_ID = "ADMIN_VERIFY_ROLE_ID",
  VERIFY_CATEGORY_ID = "VERIFY_CATEGORY_ID",
  CORS = "CORS",
  PORT = "PORT",
  HOST = "HOST",
  CLIENT_SECRET = "CLIENT_SECRET",
  CALLBACK_URL = "CALLBACK_URL",
}

export enum Environment {
  DEV = "development",
  PROD = "production",
}

export const env = (variable: Env, fallback?: string): string => {
  const val = process.env[variable];

  if (!val && !fallback) {
    throw new NoEnvFoundException(variable);
  }

  return val ?? fallback;
};

export const dev = () => env(Env.NODE_ENV) === "development";

export const ver = require("../../package.json").version;
