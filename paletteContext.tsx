import { createContext, useState } from "react";
import download from "downloadjs";
import { createPalette } from "./utilities";
import axios from "axios";

const defaultPalette = { name: "Primary", shades: createPalette("#0000ff") };

export const PalettesContext = createContext({
  palettes: [defaultPalette],
  handleChangePalette: (color: string, index: number) => {
    //
  },
  handleAddPalette: () => {
    //
  },
  handleRemovePalette: (index: number) => {
    //
  },
  handleRenamePalette: (name: string, index: number) => {
    //
  },
  exportToJson: () => {
    //
  },
  randomPalette: async () => {
    //
  },
});

export const PaletteProvider: React.FC = ({ children }) => {
  const [palettes, setPalettes] = useState([defaultPalette]);

  const randomPalette = async () => {
    const res = await axios.get("/api/randomPalette");
    setPalettes(
      res.data.colors.map((color) => {
        return {
          name: "Color",
          shades: createPalette(`#${color}`),
        };
      })
    );
  };

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
      { name: "New palette", shades: createPalette("#cccccc") },
    ]);
  };

  const handleRemovePalette = (index: number) => {
    setPalettes((prev) => prev.filter((p, i) => i !== index));
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
        handleRemovePalette,
        handleRenamePalette,
        exportToJson,
        randomPalette,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};
