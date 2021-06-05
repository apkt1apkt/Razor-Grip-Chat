import cx from "clsx";

import Divider from "@material-ui/core/Divider";
import MaterialDrawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import DrawerIcon from "@material-ui/icons/ChevronLeft";

import useUser from "@web/hooks/useUser";
import { drawerWidth } from "@web/fixed";

export default function Drawer(props: DrawerProps) {
  const { drawerOpen, handleDrawerClose, children } = props;
  const classes = useStyles();
  const { email } = useUser();
  const drawerPaper = {
    [classes.drawerOpen]: drawerOpen,
    [classes.drawerClose]: !drawerOpen,
  };
  return (
    <MaterialDrawer
      variant="permanent"
      className={cx(classes.drawer, drawerPaper)}
      classes={{ paper: cx(drawerPaper) }}
      elevation={0}
    >
      <div className={classes.toolbar}>
        {email && (
          <Tooltip title={email}>
            <ListItemText primary={email} primaryTypographyProps={{ noWrap: true }} />
          </Tooltip>
        )}
        <IconButton onClick={handleDrawerClose}>
          <DrawerIcon />
        </IconButton>
      </div>
      <Divider className={classes.divider} />
      {children}
    </MaterialDrawer>
  );
}

export type DrawerProps = {
  children: React.ReactNode;
  drawerOpen: boolean;
  handleDrawerClose: VoidFunction;
};

const useStyles = makeStyles(({ transitions, breakpoints, spacing, mixins }) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: transitions.create("width", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: transitions.create("width", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: spacing(7) + 1,
    [breakpoints.up("sm")]: {
      width: spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: spacing(0, 1),
    ...mixins.toolbar,
  },
  divider: {
    marginTop: -1,
  },
}));
