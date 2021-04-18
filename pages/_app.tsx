import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { PaletteProvider } from "../paletteContext";
import "../styles/globals.css";
import customTheme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <PaletteProvider>
        <Component {...pageProps} />
      </PaletteProvider>
    </ChakraProvider>
  );
}

export default MyApp;
