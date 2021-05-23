import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext } from "react";
import PanelList from "../components/PanelList";
import { PalettesContext } from "../paletteContext";

export default function Home() {
  const { palettes, exportToJson, randomPalette } = useContext(PalettesContext);
  return (
    <Box
      background={`linear-gradient(${
        Object.values(palettes)[0].shades[100]
      }, #fff)`}
      my={0}
    >
      <Head>
        <title>Color Palette</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>"
        />
      </Head>
      <Box maxWidth="1000px" mx="auto" py={8}>
        <Flex justifyContent="space-between">
          <Heading color={Object.values(palettes)[0].shades[800]}>
            Color Palette
          </Heading>
          <Box>
            <Button
              my={2}
              ml="auto"
              onClick={randomPalette}
              colorScheme="blackAlpha"
              variant="solid"
              mr={4}
            >
              Random Palette
            </Button>
            <Button
              my={2}
              ml="auto"
              onClick={exportToJson}
              colorScheme="blackAlpha"
              variant="outline"
            >
              Export JSON
            </Button>
          </Box>
        </Flex>
        <PanelList />
      </Box>
    </Box>
  );
}
