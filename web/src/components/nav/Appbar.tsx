import cx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";

import { drawerWidth } from "@web/fixed";

export default function Appbar(props: AppbarProps) {
  const { handleDrawerOpen, drawerOpen } = props;
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <MaterialAppBar position="fixed" className={cx(classes.appBar, { [classes.appBarShift]: drawerOpen })}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={cx(classes.menuButton, { [classes.hide]: drawerOpen })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </MaterialAppBar>
    </>
  );
}

export type AppbarProps = {
  drawerOpen: boolean;
  handleDrawerOpen: VoidFunction;
};

const useStyles = makeStyles(({ transitions, zIndex }) => ({
  appBar: {
    zIndex: zIndex.drawer + 1,
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}));
