import { createContext, useState } from "react";
import { createPalette } from "./utilities";

const defaultPalette = { name: "primary", shades: createPalette("#0000ff") };

export const PalettesContext = createContext({
  palettes: [defaultPalette],
  handleChangePalette: (color: string, index: number) => {
    //
  },
  handleAddPalette: () => {
    //
  },
  handleRenamePalette: (name: string, index: number) => {
    //
  },
});

export const PaletteProvider: React.FC = ({ children }) => {
  const [palettes, setPalettes] = useState([defaultPalette]);

  const handleChangePalette = (color: string, index: number) => {
    setPalettes((prev) => {
      const newPalette = [...prev];
      newPalette[index] = {
        name: newPalette[index].name,
        shades: createPalette(color),
      };
      return newPalette;
    });
  };

  const handleAddPalette = () => {
    setPalettes((prev) => [
      ...prev,
      { name: "New palette", shades: createPalette("#ff0000") },
    ]);
  };

  const handleRenamePalette = (name: string, index: number) => {
    setPalettes((prev) => {
      const newPalette = [...prev];
      newPalette[index] = {
        name,
        shades: { ...newPalette[index].shades },
      };
      return newPalette;
    });
  };

  return (
    <PalettesContext.Provider
      value={{
        palettes,
        handleChangePalette,
        handleAddPalette,
        handleRenamePalette,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};
