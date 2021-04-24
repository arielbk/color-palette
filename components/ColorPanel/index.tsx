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
  name: string;
  onChange: (color: string) => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  colorPalette,
  name,
  onChange,
}) => {
  return (
    <Box width="120px" my={8}>
      {name}
      <Box borderRadius={8} width="100%">
        <InputGroup>
          <InputLeftElement color="gray.500" fontSize="1.2rem" pt={2}>
            #
          </InputLeftElement>
          <Input
            value={colorPalette[500].slice(1, 7)}
            onChange={(e) => onChange("#" + e.target.value)}
            size="lg"
          />
          <InputRightElement mr={4}>
            <input
              type="color"
              value={colorPalette[500]}
              onChange={(e) => onChange(e.target.value)}
            />
          </InputRightElement>
        </InputGroup>
        {Object.entries(colorPalette).map(([number, color]) => (
          <ColorBox number={number} color={color} />
        ))}
      </Box>
      <Button
        width="100%"
        ml="auto"
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
