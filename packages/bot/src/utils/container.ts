import { useContainer, useServices } from "@matherioneu/container";
import { Container } from "../types";

/**
 * A type wrapper for the useServices function.
 * @returns
 */
export const services = (): Container => useServices<Container>();

/**
 * A simple wrapper around the useContainer() to get a specific service.
 *
 * @param serviceName
 * @returns
 */
export const service = <T extends keyof Container>(
  serviceName: T
): Container[T] => useContainer().service<Container[T]>(serviceName);
