import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreIcon from "@material-ui/icons/MoreVert";

import useThemeToggler from "@web/hooks/useThemeToggler";
import useHome from "@web/hooks/useHome";
import useBlockButton from "@web/hooks/useBlockButton";

export default function MobileCombo() {
  const blockData = useBlockButton();

  const { logout } = useAuth0();

  const { goHome } = useHome();

  const { title: themeTitle, toggleMode } = useThemeToggler();

  const { onBlockUnblock, action: blockAction } = blockData || {};

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (e: any) => setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => logout();

  const handleThemeToggle = () => {
    toggleMode();
    handleClose();
  };

  const handleBlockUnblock = () => {
    if (onBlockUnblock) onBlockUnblock();
    handleClose();
  };

  const handleGoHome = () => {
    goHome();
    handleClose();
  };

  return (
    <>
      <IconButton edge="end" aria-controls="mobile-combo" aria-haspopup="true" onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu id="mobile-combo" anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleClose}>
        {blockData && <MenuItem onClick={handleBlockUnblock}>{blockAction} this user</MenuItem>}
        <MenuItem onClick={handleGoHome}>Home</MenuItem>
        <MenuItem onClick={handleThemeToggle}>{themeTitle}</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
