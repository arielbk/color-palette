import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import download from "downloadjs";
import React from "react";
import { ColorBox } from "./ColorBox";

export type Palette = {
  50: string;
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

interface ColorPanelProps {
  colorPalette: Palette;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({ colorPalette }) => {
  return (
    <Box width="120px" borderRadius={8} overflow="hidden" my={8}>
      <InputGroup width="250px">
        <InputLeftElement color="gray.500" fontSize="1.2rem" pt={2}>
          #
        </InputLeftElement>
        <Input
          value={colorPalette[500].slice(1, 7)}
          // onChange={(e) => setColor("#" + e.target.value)}
          size="lg"
        />
        <InputRightElement mr={4}>
          <input
            type="color"
            value={colorPalette[500]}
            // onChange={(e) => setColor(e.target.value)}
          />
        </InputRightElement>
      </InputGroup>
      {Object.entries(colorPalette).map(([number, color]) => (
        <ColorBox number={number} color={color} />
      ))}
      <Button
        ml="auto"
        background={colorPalette[500]}
        color="white"
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
  );
};
