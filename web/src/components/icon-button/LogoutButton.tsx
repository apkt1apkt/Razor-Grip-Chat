import { memo } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import LogoutIcon from "@material-ui/icons/ExitToAppOutlined";

function LogoutButton() {
  const { logout } = useAuth0();
  const handleLogout = () => logout();
  return (
    <Tooltip title="Logout">
      <IconButton onClick={handleLogout} color="secondary">
        <LogoutIcon />
      </IconButton>
    </Tooltip>
  );
}

export default memo(LogoutButton, () => true);
