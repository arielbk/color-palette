import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
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
  onColorChange: (color: string) => void;
  onRename: (name: string) => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  colorPalette,
  name,
  onColorChange,
  onRename,
}) => {
  return (
    <Box width="120px" my={8} mr={2}>
      <InputGroup>
        <Input my={2} value={name} onChange={(e) => onRename(e.target.value)} />
        <InputRightElement mr={4}>
          <input
            type="color"
            value={colorPalette[500]}
            onChange={(e) => onColorChange(e.target.value)}
          />
        </InputRightElement>
      </InputGroup>
      <InputGroup>
        <InputLeftElement color="gray.500" fontSize="1.2rem" pt={2}>
          #
        </InputLeftElement>
        <Input
          value={colorPalette[500].slice(1, 7)}
          onChange={(e) => onColorChange("#" + e.target.value)}
          size="lg"
        />
      </InputGroup>
      {Object.entries(colorPalette).map(([number, color]) => (
        <ColorBox number={number} color={color} />
      ))}
    </Box>
  );
};
