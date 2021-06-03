import { useMemo, useState, createContext, useContext } from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { setMetaThemeColor } from "@web/helpers/simple";

const CustomThemeContext = createContext({ mode: "dark", toggleMode: () => {} });

export const useCustomTheme = () => useContext(CustomThemeContext);

export default function CustomTheme(props: CustomThemeProps) {
  const { children } = props;
  const [mode, setMode] = useState<"dark" | "light">("dark");

  const theme = useMemo(
    () => createMuiTheme({ palette: modes[mode], props: { MuiButtonBase: { disableRipple: true } } }),
    [mode]
  );

  const toggleMode = () => setMode(mode === "dark" ? "light" : "dark");

  const { background, text, primary } = theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  setMetaThemeColor(primary.main);
  return (
    <CustomThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

const modes: any = {
  dark: {
    type: "dark",
    error: {
      main: "#d32f2f",
    },
    primary: {
      main: "#5DADE2",
      contrastText: "#EAECEE",
    },
    secondary: {
      main: "#A83A3A",
    },
    success: {
      main: "#1ABC9C",
      contrastText: "#fff",
    },
    background: {
      default: "#17202A",
      paper: "#212F3C",
    },
    warning: {
      main: "#AF7AC5",
    },
    info: {
      main: "#9B59B6",
    },
  },
  light: {
    type: "light",
    error: {
      main: "#d32f2f",
    },
    primary: {
      main: "#1299DA",
    },
    secondary: {
      main: "#A83A3A",
    },
    success: {
      main: "#388e3c",
      contrastText: "#fff",
    },
    background: {
      default: "#F6F6F7",
      paper: "#E7F6F6",
    },
    info: {
      main: "#9B59B6",
    },
  },
};

export type CustomThemeProps = {
  children: React.ReactNode;
};
