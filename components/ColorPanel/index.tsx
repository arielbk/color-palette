import { IconButton } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { Portal } from "@chakra-ui/portal";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { CompactPicker } from "react-color";

const Blob = styled(motion.button)<{ background: string; height: number }>`
  display: inline-block;
  background: ${(props) => props.background};
  width: ${(props) => props.height}px;
  height: ${(props) => props.height}px;
  border-radius: 50%;
  margin: 32px;
  cursor: move;
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
  onDuplicate: () => void;
}

export const ColorPanel: React.FC<ColorPanelProps> = ({
  colorPalette,
  onDelete,
  onColorChange,
  onDuplicate,
  name,
  onRename,
}) => {
  const height = 140;
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
          onContextMenu={(e) => {
            e.preventDefault();
            setIsColorPickerOpen(true);
          }}
          height={height}
          background={colorPalette[500]}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent width="100%">
          <PopoverArrow />
          <Menu isOpen>
            <Box pt={6} p={2} fontWeight="800" textAlign="center">
              <Editable defaultValue={name} value={name} onChange={onRename}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Box>
            <Box
              py={2}
              sx={{
                div: {
                  boxShadow: "none",
                },
              }}
            >
              <CompactPicker
                color={colorPalette[500]}
                onChange={({ hex: color }) => onColorChange(color)}
              />
            </Box>
            <Box pb={4}>
              <MenuItem
                command="⌘T"
                onClick={() => {
                  onDuplicate();
                  setIsColorPickerOpen(false);
                }}
              >
                Duplicate
              </MenuItem>
              <MenuItem command="⌘N">Analogous</MenuItem>
              <MenuItem command="⌘⇧N">Opposite</MenuItem>
              <MenuItem command="⌘O" onClick={onDelete}>
                Delete
              </MenuItem>
            </Box>
          </Menu>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
