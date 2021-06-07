import cx from "clsx";
import { useReactiveVar } from "@apollo/client";

import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";

import BlockUserButton from "@web/components/icon-button/BlockUserButton";
import LogoutButton from "@web/components/icon-button/LogoutButton";
import ToggleThemeButton from "@web/components/icon-button/ToggleThemeButton";
import { drawerOpenVar, appbarTitleVar } from "@web/reactive";
import { drawerWidth } from "@web/fixed";

export default function Appbar() {
  const classes = useStyles();
  const drawerOpen = useReactiveVar(drawerOpenVar);
  const appbarTitle = useReactiveVar(appbarTitleVar);
  const handleDrawerOpen = () => drawerOpenVar(true);
  return (
    <>
      <CssBaseline />
      <MaterialAppBar
        elevation={1}
        position="fixed"
        className={cx(classes.appBar, { [classes.appBarShift]: drawerOpen })}
      >
        <Toolbar className={classes.toolbar}>
          <div>
            {!drawerOpen && (
              <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
            )}
            {typeof appbarTitle === "string" ? (
              <Typography variant="h6" noWrap>
                {appbarTitle}
              </Typography>
            ) : (
              appbarTitle
            )}
          </div>
          <div>
            <BlockUserButton />
            <ToggleThemeButton />
            <LogoutButton />
          </div>
        </Toolbar>
      </MaterialAppBar>
    </>
  );
}

const useStyles = makeStyles(({ transitions, zIndex, palette: { background, text } }) => ({
  appBar: {
    zIndex: zIndex.drawer + 1,
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    backgroundColor: background.paper,
    color: text.primary,
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
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    "& div": {
      display: "flex",
      alignItems: "center",
    },
  },
}));
