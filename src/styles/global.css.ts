import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./theme.css";

globalStyle(".card", {
  marginTop: "20px",
  padding: "10px",
  color: vars.color.background,
  borderColor: vars.color.foreground,
});

globalStyle(".card :last-child", {
  paddingRight: "0",
});

globalStyle(`.card .flex.one > *`, {
  "@media": {
    "(max-width: 500px)": {
      paddingLeft: "0",
      paddingRight: "0",
    },
  },
});

globalStyle(`.card .flex.two-500 > :first-child`, {
  "@media": {
    "(max-width: 500px)": {
      paddingLeft: "0",
    },
  },
});

globalStyle(".card > div", {
  paddingBottom: "0",
});

globalStyle(".card button", {
  borderColor: vars.color.foreground,
  backgroundColor: vars.color.accent,
});

globalStyle(".card h3 a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle(".card h4", {
  color: "#757575",
});

globalStyle(".card h4 a", {
  color: "inherit",
  textDecoration: "none",
});

globalStyle(".card img", {
  borderRadius: "0.2em",
  boxShadow: "0 0 3px " + vars.color.background,
});

globalStyle(".card input", {
  color: vars.color.background,
  border: "0",
  backgroundColor: "transparent",
});

globalStyle(".card label span", {
  color: "inherit",
});

globalStyle(`.card .flex`, {
  position: "relative",
  left: "0.6em",
});

globalStyle(`.card .button`, {
  borderColor: vars.color.foreground,
  backgroundColor: vars.color.accent,
});

globalStyle("a", {
  color: vars.color.accent,
  textDecoration: "underline",
});

globalStyle(`a.button`, {
  textDecoration: "none",
});

globalStyle("body", {
  width: "90vw",
  maxWidth: "700px",
  height: "auto",
  margin: "30px auto 0",
  backgroundColor: vars.color.background,
});

globalStyle("button", {
  "@media": {
    "(min-width: 500px)": {
      marginTop: "0",
    },
  },
});

globalStyle("footer span:last-child", {
  "@media": {
    "(min-width: 500px)": {
      textAlign: "right",
    },
  },
});

globalStyle("h1", {
  margin: "0",
  padding: "0",
  color: vars.color.foreground,
});

globalStyle("h1 a", {
  color: vars.color.foreground,
  textDecoration: "none",
});

globalStyle("h2", {
  margin: "0",
  padding: "0",
  color: vars.color.foreground,
});

globalStyle("h3", {
  margin: "0",
  padding: "0",
  marginRight: "0.5em",
});

globalStyle("h4", {
  margin: "0",
  padding: "0",
  fontStyle: "italic",
});

globalStyle("input", {
  color: vars.color.foreground,
});

globalStyle("pre", {
  marginBottom: "0",
});

globalStyle("pre a", {
  textDecoration: "none",
});

globalStyle("span", {
  color: vars.color.foreground,
});
