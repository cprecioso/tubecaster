import { Route } from "next";

export const route = <T extends string>(route: Route<T>) => route;
