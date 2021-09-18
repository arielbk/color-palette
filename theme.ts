import { extendTheme } from "@chakra-ui/react";
import "@fontsource/fira-code";

const customTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: "#4a4a4a",
        color: "#cacaca",
      },
    },
  },
  fonts: {
    heading: "Fira Code, monospace",
    body: "system-ui, sans-serif",
    mono: "Fira Code, monospace",
  },
});

export default customTheme;
