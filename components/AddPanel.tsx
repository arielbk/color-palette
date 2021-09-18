import { Box, Flex } from "@chakra-ui/layout";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import { useContext, useState } from "react";
import { SketchPicker } from "react-color";
import { PalettesContext } from "../paletteContext";

export const AddPanel: React.FC<{ index: number }> = ({ index }) => {
  const { handleAddPalette, palettes } = useContext(PalettesContext);
  const [color, setColor] = useState("#cccccc");
  return (
    <Popover onClose={() => handleAddPalette(color)}>
      <PopoverTrigger>
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
        >
          Add
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <SketchPicker
          color={color}
          onChange={({ hex: color }) => setColor(color)}
        />
      </PopoverContent>
    </Popover>
  );
};
