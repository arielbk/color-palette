import { extendTheme } from '@chakra-ui/react';
import '@fontsource/fira-code';
import { mode } from '@chakra-ui/theme-tools';

const customTheme = {
  config: {
    useSystemColorMode: false,
    initialColorMode: 'dark',
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('#cccccc', '#4a4a4a')(props),
        color: mode('#555', '#cacaca')(props),
      },
    }),
  },
  fonts: {
    heading: 'Fira Code, monospace',
    body: 'system-ui, sans-serif',
    mono: 'Fira Code, monospace',
  },
  components: {
    Button: {
      _focused: {
        outline: 'red',
      },
    },
  },
};

export default customTheme;
