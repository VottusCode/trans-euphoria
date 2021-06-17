import { existsSync, readFileSync, writeFileSync } from "fs";
import { service } from "./container";
import sodium from "sodium-native";
import { redBright, yellow } from "chalk";

export const getSecret = (path: string) => {
  const logger = service("logger");

  if (!existsSync(path)) {
    logger.info(yellow("Cookie secret doesn't exist, generating one.."));

    try {
      const buf = Buffer.allocUnsafe(sodium.crypto_secretbox_KEYBYTES);
      sodium.randombytes_buf(buf);
      writeFileSync(path, buf);
    } catch (error) {
      logger.error(
        redBright(`Failed to save a new cookie secret, error: ${error.message}`)
      );
      logger.error(error);
    }
  }

  return readFileSync(path);
};
