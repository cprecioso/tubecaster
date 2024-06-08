import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    background: "#282828",
    foreground: "#ffffff",
    accent: "#ff0000",
  },
});
