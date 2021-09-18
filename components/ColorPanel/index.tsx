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
import ColorPicker from "../ColorPicker";
import { ColorBox } from "./ColorBox";
import { GrDrag } from "react-icons/gr";

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
  index: number;
  id: string;
  colorPalette: Palette;
  name: string;
  onColorChange: (color: string) => void;
  onRename: (name: string) => void;
  onDelete: () => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  index,
  id,
  colorPalette,
  name,
  onColorChange,
  onRename,
  onDelete,
}) => {
  return (
    <ColorPicker
      color={colorPalette[500]}
      onChange={(hex: string) => onColorChange(hex)}
    />
  );
};
