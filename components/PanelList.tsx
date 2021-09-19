import { Box, Spinner, useColorMode } from "@chakra-ui/react";
import React, { useContext } from "react";
import { PalettesContext } from "../paletteContext";
import { AddPanel } from "./AddPanel";
import { ColorPanel } from "./ColorPanel";

const PanelList: React.FC = () => {
  const {
    palettes,
    handleChangePalette,
    handleRenamePalette,
    handleRemovePalette,
    handleAddPalette,
    isLoadingRandom,
  } = useContext(PalettesContext);
  const { colorMode } = useColorMode();
  return (
    <>
      <svg style={{ height: 0 }}>
        <defs>
          <filter id="blob-area">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
              edgeMode="wrap"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 16 -12"
              result="goo"
            />
            {/* <feComposite in="SourceGraphic" in2="goo" operator="atop" /> */}
          </filter>
        </defs>
      </svg>
      <Box
        px={16}
        py={0}
        my={8}
        background={colorMode === "light" ? "#eee" : "#3D3B3B"}
        borderRadius="30px"
        minHeight="50vh"
        overflow="hidden"
      >
        {isLoadingRandom ? (
          <Spinner display="block" mx="auto" my={16} size="lg" />
        ) : (
          <div
            style={{
              filter: "url('#blob-area')",
            }}
          >
            {palettes.map((palette, i) => (
              <ColorPanel
                index={i}
                id={palette.id}
                key={palette.id}
                colorPalette={palette.shades}
                name={palette.name}
                onColorChange={(color: string) => handleChangePalette(color, i)}
                onRename={(name: string) => handleRenamePalette(name, i)}
                onDelete={() => handleRemovePalette(i)}
                onDuplicate={() => handleAddPalette(palette.shades[500])}
              />
            ))}
          </div>
        )}
        <AddPanel index={palettes.length - 1} />
      </Box>
    </>
  );
};
export default PanelList;
