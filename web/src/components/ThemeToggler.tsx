import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";

import { useCustomTheme } from "@web/providers/CustomTheme";

export default function ThemeToggler() {
  const { mode, toggleMode } = useCustomTheme();
  const isDark = mode === "dark";
  return (
    <Tooltip title={`Switch to ${isDark ? "light" : "dark"} theme`}>
      <IconButton onClick={toggleMode}>{isDark ? <LightIcon /> : <DarkIcon />}</IconButton>
    </Tooltip>
  );
}
