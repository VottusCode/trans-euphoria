import { UnauthorizedException } from "@fasteerjs/exceptions";
import { preHandlerAsyncHookHandler } from "fastify";

export const auth: preHandlerAsyncHookHandler = async (req, res) => {
  if (!req.user) {
    throw new UnauthorizedException("You are not authenticated.");
  }
};
