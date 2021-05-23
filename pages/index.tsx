import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext } from "react";
import { AddPanel } from "../components/AddPanel";
import { ColorPanel } from "../components/ColorPanel";
import { PalettesContext } from "../paletteContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function Home() {
  const {
    palettes,
    handleChangePalette,
    handleRenamePalette,
    handleRemovePalette,
    exportToJson,
    randomPalette,
    isLoadingRandom,
  } = useContext(PalettesContext);

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newPalettes = reorder(
      palettes,
      result.source.index,
      result.destination.index
    );

    console.log(newPalettes);
  }

  return (
    <Box
      background={`linear-gradient(${
        Object.values(palettes)[0].shades[100]
      }, #fff)`}
      my={0}
    >
      <Head>
        <title>Color Palette</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎨</text></svg>"
        />
      </Head>
      <Box maxWidth="1000px" mx="auto" py={8}>
        <Flex justifyContent="space-between">
          <Heading color={Object.values(palettes)[0].shades[800]}>
            Color Palette
          </Heading>
          <Box>
            <Button
              my={2}
              ml="auto"
              onClick={randomPalette}
              colorScheme="blackAlpha"
              variant="solid"
              mr={4}
            >
              Random Palette
            </Button>
            <Button
              my={2}
              ml="auto"
              onClick={exportToJson}
              colorScheme="blackAlpha"
              variant="outline"
            >
              Export JSON
            </Button>
          </Box>
        </Flex>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="palettes" direction="horizontal">
            {(provided) => (
              <Box
                // width="100%"
                // textAlign="right"
                background={"#fff"}
                px={16}
                py={0}
                my={4}
                borderRadius={8}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {isLoadingRandom ? (
                  <Spinner mx="auto" my={64} />
                ) : (
                  <>
                    {palettes.map((palette, i) => (
                      <ColorPanel
                        index={i}
                        id={palette.id}
                        key={palette.id}
                        colorPalette={palette.shades}
                        name={palette.name}
                        onColorChange={(color: string) =>
                          handleChangePalette(color, i)
                        }
                        onRename={(name: string) =>
                          handleRenamePalette(name, i)
                        }
                        onDelete={() => handleRemovePalette(i)}
                      />
                    ))}
                    <AddPanel />
                  </>
                )}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
}
