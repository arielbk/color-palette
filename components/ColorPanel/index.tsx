import {
  Box,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { AiFillStar, AiOutlineDelete } from "react-icons/ai";
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
  onDelete: () => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  colorPalette,
  name,
  onColorChange,
  onRename,
  onDelete,
}) => {
  return (
    <Box width="100px" my={8} mr={8} textAlign="center">
      <Editable
        defaultValue={name}
        textAlign="center"
        startWithEditView
        fontWeight="600"
        mb={2}
      >
        <EditablePreview />
        <EditableInput
          value={name}
          onChange={(e) => onRename(e.target.value)}
        />
      </Editable>
      <Center mb={2}>
        <Box fontSize="1.2rem" mr={4}>
          <AiFillStar />
        </Box>
        <input
          type="color"
          value={colorPalette[500]}
          onChange={(e) => onColorChange(e.target.value)}
        />
      </Center>

      <Box borderRadius={8} overflow="hidden">
        {Object.entries(colorPalette).map(([number, color]) => (
          <ColorBox number={number} color={color} />
        ))}
      </Box>
      <IconButton
        colorScheme="red"
        icon={<AiOutlineDelete />}
        mt={2}
        variant="outline"
        onClick={onDelete}
        aria-label="Remove colour"
        borderRadius="50%"
        size="lg"
      />
    </Box>
  );
};
