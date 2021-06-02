import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import LeftPane from "@web/layout/LeftPane";
import MainPane from "@web/layout/MainPane";

export default function Layout() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  return (
    <div className={classes.root}>
      <LeftPane handleDrawerClose={handleDrawerClose} drawerOpen={open} email="tsatsuarnold@gmail.com" />
      <MainPane drawerOpen={open} handleDrawerOpen={handleDrawerOpen}>
        We are the world
      </MainPane>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
});
