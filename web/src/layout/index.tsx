import { Fragment, useEffect, useState } from "react";

import ChatMessage from "@web/components/ChatMessage";
import ChatPane from "@web/layout/ChatPane";
import CustomTheme from "@web/providers/CustomTheme";
import LeftPane from "@web/layout/LeftPane";
import MainPane from "@web/layout/MainPane";

import { useQuery, useSubscription, gql } from "@apollo/client";

const HELLO = gql`
  {
    hello
  }
`;

const SUB = gql`
  subscription HE {
    helloCalled
  }
`;

export default function Layout() {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [data, setData] = useState(new Array(10).fill(0));
  const { data: helloData, error } = useQuery(HELLO, { fetchPolicy: "network-only" });
  const { data: calledData } = useSubscription(SUB);

  console.log(helloData);

  return (
    <CustomTheme>
      <LeftPane handleDrawerClose={handleDrawerClose} drawerOpen={open} email="tsatsuarnold@gmail.com" />
      <MainPane drawerOpen={open} handleDrawerOpen={handleDrawerOpen}>
        {/* <ChatPane>
          {data.map((v, i) => (
            <Fragment key={i}>
              <ChatMessage message={"Message: " + (i + 1)} mine={i % 2 === 0} date={new Date()} />
            </Fragment>
          ))}
        </ChatPane> */}

        {helloData?.hello}
        <div>{calledData?.helloCalled}</div>
      </MainPane>
    </CustomTheme>
  );
}
