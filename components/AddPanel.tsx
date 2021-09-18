import { Box, Flex } from "@chakra-ui/layout";
import { useContext } from "react";
import { PalettesContext } from "../paletteContext";

export const AddPanel: React.FC<{ index: number }> = ({ index }) => {
  const { handleAddPalette, palettes } = useContext(PalettesContext);
  return (
    <Box display="inline-block">
      <Flex
        width="120px"
        borderWidth={2}
        borderStyle="dashed"
        height="100%"
        justifyContent="center"
        alignItems="center"
        borderRadius={8}
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
