import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { useContext } from 'react';
import { PaletteProvider, PalettesContext } from '../paletteContext';
import '../styles/globals.css';
import customTheme from '../theme';

const Wrapper: React.FC = ({ children }) => {
  const { palettes } = useContext(PalettesContext);
  return (
    <ChakraProvider
      theme={extendTheme({
        ...customTheme,
        colors: {
          primary: palettes[0]?.shades,
          secondary: palettes[1]?.shades,
        },
      })}
    >
      {children}
    </ChakraProvider>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PaletteProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </PaletteProvider>
  );
}

export default MyApp;
