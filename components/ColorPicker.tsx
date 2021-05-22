import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onChange: (hex: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button background={color} borderRadius="50%" />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverArrow />
        <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
