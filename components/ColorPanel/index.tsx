import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Portal } from "@chakra-ui/portal";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { SketchPicker } from "react-color";

const Blob = styled(motion.a)<{ background: string; height: number }>`
  display: inline-block;
  background: ${(props) => props.background};
  width: 100px;
  height: ${(props) => props.height}px;
  border-radius: 50%;
  margin: 32px;
`;

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
  colorPalette,
  onDelete,
  onColorChange,
}) => {
  const height = 110;
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  return (
    <Popover
      isLazy
      arrowSize={32}
      gutter={32}
      isOpen={isColorPickerOpen}
      onClose={() => setIsColorPickerOpen(false)}
      closeOnBlur
    >
      <PopoverTrigger>
        <Blob
          drag
          onDragEnd={(e) => {
            if ((e.target as HTMLAnchorElement).offsetHeight !== height)
              onDelete();
          }}
          onDoubleClick={() => {
            setIsColorPickerOpen(true);
          }}
          height={height}
          background={colorPalette[500]}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="100%">
          <PopoverArrow />
          <SketchPicker
            color={colorPalette[500]}
            onChange={({ hex: color }) => onColorChange(color)}
          />
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
