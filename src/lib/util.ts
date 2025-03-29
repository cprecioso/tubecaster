export type Route<T extends string> = import("next").Route<T>;

export const route = <T extends string>(route: Route<T>) => route;

// plain template string fn
const str = (
  templates: readonly string[],
  ...interpolations: readonly Parameters<typeof String>[0][]
) =>
  templates
    .slice(1)
    .reduce(
      (str, template, i) => str + String(interpolations[i]) + template,
      templates.at(0)!,
    );

// placeholder for future localization
export const t = str;

export const findMax = <T>(arr: readonly T[], fn: (item: T) => number) =>
  arr.reduce(
    (max, item) => {
      const value = fn(item);
      if (!max || max.value < value) return { item, value };
      return max;
    },
    undefined as { item: T; value: number } | undefined,
  )?.item;
