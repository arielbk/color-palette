import { Box, Flex } from "@chakra-ui/layout";
import { useContext } from "react";
import { PalettesContext } from "../paletteContext";

export const AddPanel: React.FC = () => {
  const { handleAddPalette, palettes } = useContext(PalettesContext);
  return (
    <Box my={8} py={16} pt={24} height="650px">
      <Flex
        width="120px"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={"blackAlpha.200"}
        height="100%"
        justifyContent="center"
        alignItems="center"
        borderRadius={8}
        color={"blackAlpha.500"}
        fontWeight="200"
        fontSize="2rem"
        cursor="pointer"
        _hover={{
          background: Object.values(palettes)[0].shades[50],
        }}
        onClick={handleAddPalette}
      >
        Add
      </Flex>
    </Box>
  );
};
