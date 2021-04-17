import { Button } from "@chakra-ui/button";
import { Heading, Box, Flex } from "@chakra-ui/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import download from "downloadjs";
import { adjustLuminosity, ColorPanel } from "../components/ColorPanel";

export type Palette = {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

const calculatePalette = (color: string): Palette => {
  return {
    100: adjustLuminosity(color, 140),
    200: adjustLuminosity(color, 120),
    300: adjustLuminosity(color, 80),
    400: adjustLuminosity(color, 40),
    500: color,
    600: adjustLuminosity(color, -20),
    700: adjustLuminosity(color, -40),
    800: adjustLuminosity(color, -60),
    900: adjustLuminosity(color, -80),
  };
};

export default function Home() {
  const [color, setColor] = useState("#0000ff");
  const [colorPalette, setColorPalette] = useState<Palette>(
    calculatePalette("#0000ff")
  );

  useEffect(() => {
    if (!color) return;
    setColorPalette(calculatePalette(color));
  }, [color]);

  return (
    <div>
      <Head>
        <title>Color palette</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxWidth="800px" mx="auto" my={8}>
        <Flex justifyContent="space-between">
          <Heading>Color Picker</Heading>
          <Box>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Box>
        </Flex>
        <Box width="100%" textAlign="right">
          <ColorPanel colorPalette={colorPalette} />
          <Button
            ml="auto"
            colorScheme="blue"
            onClick={() =>
              download(
                JSON.stringify(colorPalette, null, 2),
                "palette.json",
                "application/json"
              )
            }
          >
            Export JSON
          </Button>
        </Box>
      </Box>
    </div>
  );
}
