import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext } from "react";
import { AddPanel } from "../components/AddPanel";
import { ColorPanel } from "../components/ColorPanel";
import { PalettesContext } from "../paletteContext";

export default function Home() {
  const {
    palettes,
    handleChangePalette,
    handleRenamePalette,
    exportToJson,
  } = useContext(PalettesContext);
  return (
    <div>
      <Head>
        <title>Color Palette</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxWidth="800px" mx="auto" my={8}>
        <Flex justifyContent="space-between">
          <Heading>Color Palette</Heading>
          <Button my={2} ml="auto" onClick={exportToJson}>
            Export JSON
          </Button>
        </Flex>
        <Flex width="100%" textAlign="right">
          {palettes.map((palette, i) => (
            <ColorPanel
              colorPalette={palette.shades}
              name={palette.name}
              onColorChange={(color: string) => handleChangePalette(color, i)}
              onRename={(name: string) => handleRenamePalette(name, i)}
            />
          ))}
          <AddPanel />
        </Flex>
      </Box>
    </div>
  );
}
