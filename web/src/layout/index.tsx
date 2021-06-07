import cx from "clsx";
import { Switch, Route, Redirect } from "react-router-dom";
import { lazy, Suspense } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Appbar from "@web/components/Appbar";
import Drawer from "@web/components/Drawer";
import HomePage from "@web/pages/HomePage";
import UsersOnline from "@web/components/UsersOnline";
import { drawerMiniWidth, drawerWidth } from "@web/fixed";
import { useReactiveVar } from "@apollo/client";
import { drawerOpenVar, recipientVar } from "@web/reactive";

const RecentChatsPage = lazy(() => import("@web/pages/RecentChatsPage"));
const BlockedUsersPage = lazy(() => import("@web/pages/BlockedUsersPage"));
const ChatPage = lazy(() => import("@web/pages/ChatPage"));
const BottomPane = lazy(() => import("@web/layout/BottomPane"));

export default function Layout() {
  const classes = useStyles();
  const drawerOpen = useReactiveVar(drawerOpenVar);
  const recipient = useReactiveVar(recipientVar);

  return (
    <>
      <Appbar />
      <Drawer>
        <UsersOnline />
      </Drawer>
      <main>
        <div className={classes.toolbar} />
        <div className={cx(classes.children, { [classes.childrenShift]: drawerOpen })}>
          <Suspense fallback={<></>}>
            {recipient && (
              <>
                <ChatPage />
                <Redirect from="/*" to="/" />
              </>
            )}
            {!recipient && (
              <Switch>
                <Route path="/recent" component={RecentChatsPage} />
                <Route path="/blocked" component={BlockedUsersPage} />
                <Route path="/" component={HomePage} />
              </Switch>
            )}
          </Suspense>
        </div>
        <Suspense fallback={<></>}>{recipient && <BottomPane />}</Suspense>
      </main>
    </>
  );
}

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
    marginLeft: drawerMiniWidth,
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
