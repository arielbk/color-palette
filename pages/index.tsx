import { Box, Flex, Heading } from '@chakra-ui/layout';
import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';
import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { FaFileExport, FaMoon, FaRandom, FaSun } from 'react-icons/fa';
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
      <Box maxWidth="1000px" py={8} mx="auto" px={4} height="100vh">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>Color Palette</Heading>
          <Box>
            <Tooltip label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}>
              <Button onClick={toggleColorMode} mr={4} size="lg">
                {colorMode === 'light' ? <FaMoon /> : <FaSun />}
              </Button>
            </Tooltip>
            <Tooltip label="Random palette">
              <Button
                my={2}
                ml="auto"
                onClick={randomPalette}
                variant="solid"
                mr={4}
                size="lg"
              >
                <FaRandom />
              </Button>
            </Tooltip>
            <Tooltip label="Export JSON">
              <Button
                my={2}
                ml="auto"
                onClick={exportToJson}
                variant="solid"
                size="lg"
              >
                <FaFileExport />
              </Button>
            </Tooltip>
          </Box>
        </Flex>
        <PanelList gooiness={gooiness} />
        <Box
          position="absolute"
          bottom={8}
          width="100%"
          px={8}
          maxWidth="1000px"
        >
          <Flex alignItems="center" mx={8}>
            <Heading size="md" mr={8}>
              Gooiness
            </Heading>
            <Slider
              aria-label="gooiness"
              defaultValue={gooiness}
              value={gooiness}
              onChange={(newVal) => setGooiness(newVal)}
              min={0.29}
              max={3.3}
              step={0.01}
              size="lg"
              colorScheme="primary"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
