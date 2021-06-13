import { NoEnvFoundException } from "../exceptions/NoEnvFoundException";

export const env = (variable: string): string => {
  const val = process.env[variable];

  if (!variable) {
    throw new NoEnvFoundException(val);
  }

  return val;
};
