import { Box, Flex } from "@chakra-ui/layout";
import { useContext } from "react";
import { PalettesContext } from "../paletteContext";

export const AddPanel: React.FC = () => {
  const { handleAddPalette } = useContext(PalettesContext);
  return (
    <Box my={8} py={14}>
      <Flex
        width="120px"
        borderWidth={2}
        borderStyle="dashed"
        height="100%"
        justifyContent="center"
        alignItems="center"
        borderRadius={8}
        color="gray.400"
        fontWeight="200"
        fontSize="2rem"
        cursor="pointer"
        _hover={{
          background: "gray.50",
        }}
        onClick={handleAddPalette}
      >
        Add
      </Flex>
    </Box>
  );
};
