import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

import DarkIcon from "@material-ui/icons/Brightness4";
import LightIcon from "@material-ui/icons/Brightness7";

import useThemeToggler from "@web/hooks/useThemeToggler";

export default function ToggleThemeButton() {
  const { toggleMode, isDark, title } = useThemeToggler();
  return (
    <Tooltip title={title}>
      <IconButton onClick={toggleMode} color="primary">
        {isDark ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </Tooltip>
  );
}
