import { createContext, useCallback, useEffect, useState } from 'react';
import download from 'downloadjs';
import axios from 'axios';
import { createPalette } from './utilities';
import { uuid } from 'uuidv4';

const defaultPalette = {
  id: uuid(),
  name: 'Primary',
  shades: createPalette('#0000ff'),
};
type PaletteList = typeof defaultPalette[];

export const PalettesContext = createContext({
  palettes: [defaultPalette],
  handleChangePalette: (color: string, index: number) => {
    // void
  },
  handleAddPalette: (color: string, i?: number) => {
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
  changeOrder: (index: number, newIndex: number) => {
    // void
  },
  isLoadingRandom: false,
});

export const PaletteProvider: React.FC = ({ children }) => {
  const [palettes, setPalettes] = useState([defaultPalette]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  const randomPalette = useCallback(async () => {
    setIsLoadingRandom(true);
    const res = await axios.get('/api/randomPalette');
    const newPalettes = res.data.colors.map((color, i) => {
      return {
        id: uuid(),
        name: i === 0 ? 'Primary' : `Color ${i}`,
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

  const handleAddPalette = (color: string, index?: number) => {
    if (index) {
      setPalettes((prev) => {
        const newPalettes = [...prev];
        newPalettes.splice(index, 0, {
          id: uuid(),
          name: `Color ${index + 1}`,
          shades: createPalette(color),
        });
        return newPalettes;
      });
    } else {
      setPalettes((prev) => [
        ...prev,
        { id: uuid(), name: 'New palette', shades: createPalette(color) },
      ]);
    }
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
    download(JSON.stringify(json, null, 2), 'palette.json', 'application/json');
  };

  const changeOrder = (index: number, newIndex: number) => {
    setPalettes((prev) => {
      const newPalette = [...prev];
      const [removed] = newPalette.splice(index, 1);
      newPalette.splice(newIndex, 0, removed);
      return newPalette;
    });
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
        changeOrder,
      }}
    >
      {children}
    </PalettesContext.Provider>
  );
};
