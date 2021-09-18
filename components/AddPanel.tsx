import { Box, Flex } from "@chakra-ui/layout";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import { useContext, useState } from "react";
import { SketchPicker } from "react-color";
import { PalettesContext } from "../paletteContext";

export const AddPanel: React.FC<{ index: number }> = ({ index }) => {
  const { handleAddPalette, palettes } = useContext(PalettesContext);
  return (
    <Flex
      borderWidth={2}
      borderStyle="dashed"
      height="110px"
      width="110px"
      my={8}
      ml="auto"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      fontWeight="200"
      fontSize="2rem"
      cursor="pointer"
      _hover={{
        background: Object.values(palettes)[0].shades[50],
      }}
      onClick={() => handleAddPalette("#cccccc")}
    >
      Add
    </Flex>
  );
};
