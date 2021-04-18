import { createContext, useState } from "react";
import { createPalette } from "./utilities";

export const PalettesContext = createContext({
  palettes: [createPalette("#0000ff")],
});

export const PaletteProvider: React.FC = ({ children }) => {
  const [palettes, setPalettes] = useState([createPalette("#0000ff")]);
  return (
    <PalettesContext.Provider value={{ palettes }}>
      {children}
    </PalettesContext.Provider>
  );
};
