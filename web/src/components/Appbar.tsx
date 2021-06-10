import cx from "clsx";
import { useReactiveVar } from "@apollo/client";

import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";

import BlockUserButton from "@web/components/icon-button/BlockUserButton";
import HomeButton from "@web/components/icon-button/HomeButton";
import LogoutButton from "@web/components/icon-button/LogoutButton";
import MobileCombo from "@web/components/icon-button/MobileCombo";
import ToggleThemeButton from "@web/components/icon-button/ToggleThemeButton";
import { drawerOpenVar, appbarTitleVar } from "@web/reactive";
import { drawerWidth } from "@web/fixed";

export default function Appbar() {
  const classes = useStyles();
  const drawerOpen = useReactiveVar(drawerOpenVar);
  const appbarTitle = useReactiveVar(appbarTitleVar);
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const handleDrawerOpen = () => drawerOpenVar(true);
  const titleIsString = typeof appbarTitle === "string";
  return (
    <>
      <CssBaseline />
      <MaterialAppBar
        elevation={1}
        position="fixed"
        className={cx(classes.appBar, { [classes.appBarShift]: drawerOpen })}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            {!drawerOpen && (isWideScreen || titleIsString) && (
              <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton}>
                <MenuIcon />
              </IconButton>
            )}
            {titleIsString ? (
              <Typography variant="h6" noWrap>
                {appbarTitle}
              </Typography>
            ) : (
              <div style={{ marginTop: -5, marginBottom: -5 }}>{appbarTitle}</div>
            )}
          </div>
          <div className={classes.rightButtons}>
            <BlockUserButton />
            <HomeButton />
            <ToggleThemeButton />
            <LogoutButton />
          </div>
          <div className={classes.mobileButton}>
            <MobileCombo />
          </div>
        </Toolbar>
      </MaterialAppBar>
    </>
  );
}

const useStyles = makeStyles(({ transitions, zIndex, palette: { background, text }, breakpoints }) => ({
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
    [breakpoints.up("sm")]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: transitions.create(["width", "margin"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  },
  left: {
    width: "calc(100% - 20px)",
    [breakpoints.up("md")]: {
      width: "calc(100% - 180px) !important",
    },
    display: "flex",
    alignItems: "center",
  },
  menuButton: {
    marginRight: 0,
    marginLeft: -15,
    [breakpoints.up("sm")]: {
      marginRight: "36px !important",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightButtons: {
    [breakpoints.down("sm")]: {
      display: "none !important",
    },
    display: "flex",
  },
  mobileButton: {
    [breakpoints.up("md")]: {
      display: "none !important",
    },
  },
}));
