import { Fragment, useEffect, useState } from "react";

import ChatMessage from "@web/components/ChatMessage";
import ChatPane from "@web/layout/ChatPane";
import CustomTheme from "@web/providers/CustomTheme";
import LeftPane from "@web/layout/LeftPane";
import MainPane from "@web/layout/MainPane";

export default function Layout() {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [data, setData] = useState(new Array(10).fill(0));
  useEffect(() => {
    const s = setTimeout(() => {
      setData([...data, 0]);
    }, 1500);
    return () => {
      clearTimeout(s);
    };
  }, [data]);

  return (
    <CustomTheme>
      <LeftPane handleDrawerClose={handleDrawerClose} drawerOpen={open} email="tsatsuarnold@gmail.com" />
      <MainPane drawerOpen={open} handleDrawerOpen={handleDrawerOpen}>
        <ChatPane>
          {data.map((v, i) => (
            <Fragment key={i}>
              <ChatMessage message={"Message: " + (i + 1)} mine={i % 2 === 0} date={new Date()} />
            </Fragment>
          ))}
        </ChatPane>
      </MainPane>
    </CustomTheme>
  );
}
