import { forwardRef } from "react";

import Divider from "@material-ui/core/Divider";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

export const ToMenu = forwardRef<any, ToMenuProps>((props, ref) => {
  const { onClick, label, primary, secondary, Icon, iconSpace, iconColor, dividerAfter, dividerBefore } = props;
  const hasIcon = !!Icon || iconSpace;
  return (
    <>
      {dividerBefore && <Divider style={{ margin: "5px 0" }} />}
      <MenuItem ref={ref} onClick={onClick}>
        {hasIcon && <ListItemIcon>{Icon ? <Icon color={iconColor || "primary"} /> : <></>}</ListItemIcon>}
        {!label ? (
          <ListItemText primary={primary} secondary={secondary} style={{ marginRight: hasIcon ? undefined : 10 }} />
        ) : (
          <Typography variant="inherit" noWrap style={{ marginRight: hasIcon ? undefined : 10 }}>
            {label}
          </Typography>
        )}
      </MenuItem>
      {dividerAfter && <Divider style={{ margin: "5px 0" }} />}
    </>
  );
});

export type ToMenuProps = {
  onClick?: React.EventHandler<any> | VoidFunction;
  Icon?: Web.Icon;
  label?: React.ReactNode;
  primary?: string;
  secondary?: string;
  iconSpace?: boolean;
  dividerBefore?: boolean;
  dividerAfter?: boolean;
  iconColor?: "primary" | "secondary" | "inherit";
};
