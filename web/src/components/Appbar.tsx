import cx from "clsx";

import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ExitToAppIcon from "@material-ui/icons/ExitToAppOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

import IconTriggerMenu, { IconTriggerMenuProps } from "@web/components/IconTriggerMenu";
import ThemeToggler from "@web/components/ThemeToggler";
import { drawerWidth } from "@web/fixed";

export default function Appbar(props: AppbarProps) {
  const { handleDrawerOpen, drawerOpen, menus } = props;
  const classes = useStyles();
  const newMenus = [...(menus || []), { label: "Logout", Icon: ExitToAppIcon }];
  return (
    <>
      <CssBaseline />
      <MaterialAppBar
        elevation={0}
        position="fixed"
        className={cx(classes.appBar, { [classes.appBarShift]: drawerOpen })}
      >
        <Toolbar className={classes.toolbar}>
          <div>
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
          </div>
          <div>
            <ThemeToggler />
            <IconTriggerMenu menus={newMenus} id="appbar-more">
              <MoreVertIcon />
            </IconTriggerMenu>
          </div>
        </Toolbar>
      </MaterialAppBar>
    </>
  );
}

export type AppbarProps = {
  drawerOpen: boolean;
  handleDrawerOpen: VoidFunction;
  menus?: IconTriggerMenuProps["menus"];
};

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
  hide: {
    display: "none",
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
