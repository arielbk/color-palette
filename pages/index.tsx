import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
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
    handleRemovePalette,
    exportToJson,
    randomPalette,
    isLoadingRandom,
  } = useContext(PalettesContext);
  return (
    <Box background="#eee" my={0}>
      <Head>
        <title>Color Palette</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>"
        />
      </Head>
      <Box maxWidth="1000px" mx="auto" py={8}>
        <Flex justifyContent="space-between">
          <Heading>Color Palette</Heading>
          <Box>
            <Button
              my={2}
              ml="auto"
              onClick={randomPalette}
              colorScheme="twitter"
              variant="solid"
              mr={4}
            >
              Random Palette
            </Button>
            <Button
              my={2}
              ml="auto"
              onClick={exportToJson}
              colorScheme="twitter"
              variant="outline"
            >
              Export JSON
            </Button>
          </Box>
        </Flex>
        <Flex
          width="100%"
          textAlign="right"
          background="#fff"
          px={8}
          py={4}
          my={4}
          borderRadius={8}
        >
          {isLoadingRandom ? (
            <Spinner mx="auto" my={32} />
          ) : (
            <>
              {palettes.map((palette, i) => (
                <ColorPanel
                  colorPalette={palette.shades}
                  name={palette.name}
                  onColorChange={(color: string) =>
                    handleChangePalette(color, i)
                  }
                  onRename={(name: string) => handleRenamePalette(name, i)}
                  onDelete={() => handleRemovePalette(i)}
                />
              ))}
              <AddPanel />
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
