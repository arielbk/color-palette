import { useClipboard } from "@chakra-ui/hooks";
import { Box, Flex } from "@chakra-ui/layout";
import { color } from "@chakra-ui/styled-system";
import { useTheme } from "@emotion/react";
import { useState } from "react";

export const ColorBox: React.FC<{ color: string; number: string }> = ({
  color,
  number,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { onCopy, hasCopied } = useClipboard(color);

  return (
    <Flex
      width="100%"
      height="50px"
      backgroundColor={color}
      color="#fff"
      justifyContent="center"
      alignItems="center"
      fontWeight="600"
      fontSize="1rem"
      cursor="pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onCopy}
    >
      {hasCopied ? "Copied!" : isHovered ? color : number}
    </Flex>
  );
};
