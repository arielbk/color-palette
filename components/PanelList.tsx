import { Box, Spinner } from "@chakra-ui/react";
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
    isLoadingRandom,
  } = useContext(PalettesContext);
  return (
    <>
      <svg style={{ height: 0 }}>
        <defs>
          <filter id="blob-area">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="16"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            {/* <feComposite in="SourceGraphic" in2="goo" operator="atop" /> */}
            <filter id="blob-no-blur">
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </filter>
        </defs>
      </svg>
      <Box
        px={16}
        py={0}
        my={16}
        background="#3D3B3B"
        borderRadius="30px"
        height="50vh"
      >
        {isLoadingRandom ? (
          <Spinner mx="auto" my={64} />
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
