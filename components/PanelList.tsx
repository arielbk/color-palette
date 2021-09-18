import { Box, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
    onDragEnd,
  } = useContext(PalettesContext);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="palettes" direction="horizontal">
        {(provided) => (
          <Box
            px={16}
            py={0}
            my={4}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {isLoadingRandom ? (
              <Spinner mx="auto" my={64} />
            ) : (
              palettes.map((palette, i) => (
                <ColorPanel
                  index={i}
                  id={palette.id}
                  key={palette.id}
                  colorPalette={palette.shades}
                  name={palette.name}
                  onColorChange={(color: string) =>
                    handleChangePalette(color, i)
                  }
                  onRename={(name: string) => handleRenamePalette(name, i)}
                  onDelete={() => handleRemovePalette(i)}
                />
              ))
            )}
            <AddPanel index={palettes.length - 1} />
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default PanelList;
