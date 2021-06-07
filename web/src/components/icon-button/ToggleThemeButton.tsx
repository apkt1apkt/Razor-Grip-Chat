import { useReactiveVar } from "@apollo/client";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";

import { themeVar } from "@web/reactive";

export default function ToggleThemeButton() {
  const mode = useReactiveVar(themeVar);
  const isDark = mode === "dark";
  const toggleMode = () => themeVar(isDark ? "light" : "dark");
  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} theme`}>
      <IconButton onClick={toggleMode} color="primary">
        {isDark ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
}
