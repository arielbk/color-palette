import { Box, Flex, Heading } from '@chakra-ui/layout';
import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import PanelList from '../components/PanelList';
import { PalettesContext } from '../paletteContext';

export default function Home() {
  const { exportToJson, randomPalette, palettes } = useContext(PalettesContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const [gooiness, setGooiness] = useState(1.2);
  return (
    <Box my={0}>
      <Head>
        <title>Color Palette</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>"
        />
      </Head>
      <Box maxWidth="1000px" py={8} mx="auto" px={4}>
        <Flex justifyContent="space-between">
          <Heading>Color Palette</Heading>
          <Box>
            <Button onClick={toggleColorMode} mr={4}>
              {colorMode === 'light' ? '🌙' : '☀️'}
            </Button>
            <Button
              my={2}
              ml="auto"
              onClick={randomPalette}
              variant="solid"
              mr={4}
            >
              Random Palette
            </Button>
            <Button my={2} ml="auto" onClick={exportToJson} variant="outline">
              Export JSON
            </Button>
          </Box>
        </Flex>
        <PanelList gooiness={gooiness} />
        <Slider
          aria-label="gooiness"
          defaultValue={gooiness}
          value={gooiness}
          onChange={(newVal) => setGooiness(newVal)}
          min={0}
          max={3.5}
          step={0.01}
          size="lg"
          colorScheme="primary"
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Box>
  );
}
