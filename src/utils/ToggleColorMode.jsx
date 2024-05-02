import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, useMemo, useState } from 'react';

export const ToggleColorModeContext = createContext();

function ToggleColorMode({ children }) {
  const [mode, setmode] = useState('dark');

  const toggleMode = () => {
    setmode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      // eslint-disable-next-line implicit-arrow-linebreak
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ToggleColorModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleColorModeContext.Provider>
  );
}
export default ToggleColorMode;
