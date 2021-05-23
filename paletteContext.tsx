import { createContext, useCallback, useEffect, useState } from "react";
import download from "downloadjs";
import axios from "axios";
import { createPalette } from "./utilities";
import { uuid } from "uuidv4";
import { DropResult, ResponderProvided } from "react-beautiful-dnd";

const defaultPalette = {
  id: uuid(),
  name: "Primary",
  shades: createPalette("#0000ff"),
};
type PaletteList = typeof defaultPalette[];

const reorder = (
  list: PaletteList,
  startIndex: number,
  endIndex: number
): PaletteList => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const PalettesContext = createContext({
  palettes: [defaultPalette],
  handleChangePalette: (color: string, index: number) => {
    // void
  },
  handleAddPalette: () => {
    // void
  },
  handleRemovePalette: (index: number) => {
    // void
  },
  handleRenamePalette: (name: string, index: number) => {
    // void
  },
  exportToJson: () => {
    // void
  },
  randomPalette: async () => {
    // void
  },
  isLoadingRandom: false,
  onDragEnd: (result: DropResult, provided: ResponderProvided) => {
    // void
  },
});

export const PaletteProvider: React.FC = ({ children }) => {
  const [palettes, setPalettes] = useState([defaultPalette]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  const randomPalette = useCallback(async () => {
    setIsLoadingRandom(true);
    const res = await axios.get("/api/randomPalette");
    const newPalettes = res.data.colors.map((color, i) => {
      return {
        id: uuid(),
        name: i === 0 ? "Primary" : `Color ${i}`,
        shades: createPalette(`#${color}`),
      };
    });
    setPalettes(newPalettes);
    setIsLoadingRandom(false);
  }, []);

  const handleChangePalette = (color: string, index: number) => {
    setPalettes((prev) => {
      const newPalette = [...prev];
      newPalette[index] = {
        ...newPalette[index],
        shades: createPalette(color),
      };
      return newPalette;
    });
  };

  const handleAddPalette = () => {
    setPalettes((prev) => [
      ...prev,
      { id: uuid(), name: "New palette", shades: createPalette("#cccccc") },
    ]);
  };

  const handleRemovePalette = (index: number) => {
    setPalettes((prev) => prev.filter((p, i) => i !== index));
  };

  const handleRenamePalette = (name: string, index: number) => {
    setPalettes((prev) => {
      const newPalette = [...prev];
      newPalette[index] = {
        ...newPalette[index],
        name,
      };
      return newPalette;
    });
  };

  const exportToJson = () => {
    const json = {};
    palettes.forEach((p) => (json[p.name] = p.shades));
    download(JSON.stringify(json, null, 2), "palette.json", "application/json");
  };

  const onDragEnd = (result) => {
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

    setPalettes(newPalettes);
  };

  useEffect(() => {
    randomPalette();
  }, []);

  return (
    <PalettesContext.Provider
      value={{
        palettes,
        handleChangePalette,
        handleAddPalette,
        handleRemovePalette,
        handleRenamePalette,
        exportToJson,
        randomPalette,
        isLoadingRandom,
        onDragEnd,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};
