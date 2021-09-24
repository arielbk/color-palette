import { Flex } from '@chakra-ui/layout';
import { useContext } from 'react';
import { PalettesContext } from '../paletteContext';

export const AddPanel: React.FC<{ index: number }> = ({ index }) => {
  const { handleAddPalette, palettes } = useContext(PalettesContext);
  return (
    <Flex
      borderWidth={2}
      borderStyle="dashed"
      height="110px"
      width="110px"
      mt={64}
      ml="auto"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      fontWeight="200"
      fontSize="2rem"
      cursor="pointer"
      position="fixed"
      onClick={() => handleAddPalette('#cccccc')}
      left="70%"
      bottom="25%"
      userSelect="none"
    >
      Add
    </Flex>
  );
};
