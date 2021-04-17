import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
});

export default customTheme;
