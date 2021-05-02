import { useClipboard } from "@chakra-ui/hooks";
import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";

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
      position="relative"
    >
      {!isHovered && number === "500" ? (
        <Box position="absolute" left={3} fontSize="1.2rem">
          <AiFillStar />
        </Box>
      ) : null}
      {hasCopied ? "Copied!" : isHovered ? color : number}
    </Flex>
  );
};
