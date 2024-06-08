import { Route } from "next";

export const coerceUrl = <T extends string>(route: Route<T>) => route;
