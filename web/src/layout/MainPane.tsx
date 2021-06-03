import cx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import Appbar, { AppbarProps } from "@web/components/Appbar";
import BottomPane from "@web/layout/BottomPane";
import { drawerMiniWidth, drawerWidth } from "@web/fixed";

export default function MainPane(props: MainPaneProps) {
  const { children, ...appbarProps } = props;
  const classes = useStyles();
  return (
    <>
      <Appbar {...appbarProps} />
      <main>
        <div className={classes.toolbar} />
        <div className={cx(classes.children, { [classes.childrenShift]: appbarProps.drawerOpen })}>
          <div className={classes.flow2}>{children}</div>
        </div>
        <BottomPane drawerOpen={appbarProps.drawerOpen} />
      </main>
    </>
  );
}

type MainPaneProps = {
  children: React.ReactNode;
} & AppbarProps;

const useStyles = makeStyles(({ spacing, mixins, transitions }) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: spacing(0, 1),
    ...mixins.toolbar,
  },
  children: {
    width: `calc(100% - ${drawerMiniWidth}px)`,
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
    backgroundColor: "red",
    marginLeft: drawerMiniWidth,
    backgroundSize: "cover",
    backgroundImage: "url(" + picture + ")",
    backgroundAttachment: "fixed",
  },
  flow2: {
    height: "calc(100vh - 138px)",
    color: "inherit",
    flex: 1,
    backgroundColor: "rgba(23, 32, 42 , 0.83)",
  },

  childrenShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: transitions.create(["width", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.enteringScreen,
    }),
  },
}));

const picture = "https://apkt.fra1.cdn.digitaloceanspaces.com/dev_arnold/images/random/hd2.jpg";
