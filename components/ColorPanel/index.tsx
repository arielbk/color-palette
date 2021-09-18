import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";

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
}) => {
  const height = 110;
  return (
    <Blob
      drag
      onDragEnd={(e) => {
        if ((e.target as HTMLAnchorElement).offsetHeight !== height) onDelete();
      }}
      height={height}
      background={colorPalette[500]}
    />
  );
};
