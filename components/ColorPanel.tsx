import { Box, Flex } from "@chakra-ui/layout";
import { color } from "@chakra-ui/styled-system";
import { useState } from "react";
import { Palette } from "../pages";

interface ColorPanelProps {
  colorPalette: Palette;
}

const ColorBox: React.FC<{ color: string; number: string }> = ({
  color,
  number,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const onCopy = async () => {
    if (isCopied) return;
    const copied = await navigator.clipboard.writeText(color);
    setIsCopied(true);
    setInterval(() => setIsCopied(false), 3000);
  };

  return (
    <Flex
      width="100%"
      height="50px"
      backgroundColor={color}
      color="#fff"
      justifyContent="center"
      alignItems="center"
      fontWeight="600"
      fontSize="1.4rem"
      cursor="pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCopy}
    >
      {isCopied ? "Copied!" : isHovered ? color : number}
    </Flex>
  );
};

export const adjustLuminosity = (color: string, amount: number) => {
  // receives a hex color in the form #rrggbb
  const split = {
    r: parseInt(color.slice(1, 3), 16),
    g: parseInt(color.slice(3, 5), 16),
    b: parseInt(color.slice(5, 7), 16),
  };
  const adjusted = {
    r:
      amount > 0
        ? Math.min(255, split.r + amount)
        : Math.max(0, split.r + amount),
    g:
      amount > 0
        ? Math.min(255, split.g + amount)
        : Math.max(0, split.g + amount),
    b:
      amount > 0
        ? Math.min(255, split.b + amount)
        : Math.max(0, split.b + amount),
  };
  return `#${adjusted.r.toString(16).padStart(2, "0")}${adjusted.g
    .toString(16)
    .padStart(2, "0")}${adjusted.b.toString(16).padStart(2, "0")}`;
};

export const ColorPanel: React.FC<ColorPanelProps> = ({ colorPalette }) => {
  console.log(Object.entries(colorPalette));
  return (
    <Box width="100%" borderRadius={8} overflow="hidden" my={8}>
      {Object.entries(colorPalette).map(([number, color]) => (
        <ColorBox number={number} color={color} />
      ))}
    </Box>
  );
};
