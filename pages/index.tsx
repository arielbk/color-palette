import { Box, Flex, Heading } from "@chakra-ui/layout";
import Head from "next/head";
import { useContext } from "react";
import { ColorPanel } from "../components/ColorPanel";
import { PalettesContext } from "../paletteContext";

export default function Home() {
  const { palettes } = useContext(PalettesContext);
  return (
    <div>
      <Head>
        <title>Color Palette</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxWidth="800px" mx="auto" my={8}>
        <Flex justifyContent="space-between">
          <Heading>Color Palette</Heading>
        </Flex>
        <Box width="100%" textAlign="right">
          {palettes.map((palette) => (
            <ColorPanel colorPalette={palette} />
          ))}
        </Box>
      </Box>
    </div>
  );
}
