import {
  Button,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import React from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  color: string;
  onChange: (hex: string) => void;
}

const Blob = styled(motion.a)<{ background: string }>`
  display: inline-block;
  background: ${(props) => props.background};
  width: 100px;
  height: 110px;
  border-radius: 50%;
  margin: 32px;
`;

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return <Blob drag background={color} />;
};

export default ColorPicker;
