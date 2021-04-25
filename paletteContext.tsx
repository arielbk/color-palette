import { createContext, useState } from "react";
import download from "downloadjs";
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
  exportToJson: () => {
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

  const exportToJson = () => {
    const json = {};
    palettes.forEach((p) => (json[p.name] = p.shades));
    download(JSON.stringify(json, null, 2), "palette.json", "application/json");
  };

  return (
    <PalettesContext.Provider
      value={{
        palettes,
        handleChangePalette,
        handleAddPalette,
        handleRenamePalette,
        exportToJson,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};
