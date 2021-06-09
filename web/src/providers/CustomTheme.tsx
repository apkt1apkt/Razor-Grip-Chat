import { useEffect, useMemo } from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { setMetaThemeColor } from "@web/helpers/simple";
import { useReactiveVar } from "@apollo/client";
import { themeVar } from "@web/reactive";
import { useAuth0 } from "@auth0/auth0-react";

export default function CustomTheme(props: CustomThemeProps) {
  const { children } = props;
  const mode = useReactiveVar(themeVar);
  const { user } = useAuth0();

  const theme = useMemo(
    () => createMuiTheme({ palette: modes[mode], props: { MuiButtonBase: { disableRipple: true } } }),
    [mode]
  );

  useEffect(() => {
    localStorage.setItem(`${user?.sub}:theme`, mode);
    localStorage.setItem("theme", mode);
  }, [mode, user?.sub]);

  useEffect(() => {
    const themeFromStorage = localStorage.getItem(`${user?.sub}:theme`) === "light" ? "light" : "dark";
    if (themeVar() !== themeFromStorage) themeVar(themeFromStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { background, text, primary } = theme.palette;
  document.body.style.backgroundColor = background.default;
  document.body.style.color = text.primary;
  setMetaThemeColor(primary.main);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const modes: any = {
  dark: {
    type: "dark",
    background: {
      default: "#17202A",
      paper: "#212F3C",
    },
    primary: {
      main: "#208587",
    },
  },

  light: {
    type: "light",
  },
};

export type CustomThemeProps = {
  children: React.ReactNode;
};
