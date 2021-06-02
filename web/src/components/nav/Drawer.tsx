import cx from "clsx";

import Divider from "@material-ui/core/Divider";
import MaterialDrawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

import DrawerIcon from "@material-ui/icons/ChevronLeft";

import { drawerWidth } from "@web/fixed";

export default function Drawer(props: DrawerProps) {
  const { drawerOpen, handleDrawerClose, email, children } = props;
  const classes = useStyles();
  const drawerPaper = {
    [classes.drawerOpen]: drawerOpen,
    [classes.drawerClose]: !drawerOpen,
  };
  return (
    <MaterialDrawer
      variant="permanent"
      className={cx(classes.drawer, drawerPaper)}
      classes={{ paper: cx(drawerPaper) }}
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
      <Divider />
      {children}
    </MaterialDrawer>
  );
}

export type DrawerProps = {
  children: React.ReactNode;
  drawerOpen: boolean;
  handleDrawerClose: VoidFunction;
  email?: string;
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
      width: spacing(9),
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 5,
    paddingLeft: 10,
    ...mixins.toolbar,
  },
}));
