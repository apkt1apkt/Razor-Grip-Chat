import { Fragment, useEffect, useState } from "react";

import ChatMessage from "@web/components/ChatMessage";
import ChatPane from "@web/layout/ChatPane";
import LeftPane from "@web/layout/LeftPane";
import MainPane from "@web/layout/MainPane";

import { useQuery, useLazyQuery, gql } from "@apollo/client";

const HELLO = gql`
  {
    hello
  }
`;

const SUB = gql`
  subscription HE($b: String) {
    helloCalled(b: $b)
  }
`;

export default function Layout() {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const [data, setData] = useState(new Array(10).fill(0));
  // const [getter, { data: helloData, error }] = useLazyQuery(HELLO, { fetchPolicy: "network-only" });
  // const { data: helloData, error } = useQuery(HELLO, { fetchPolicy: "network-only" });
  // const { data: calledData } = useSubscription(SUB, { variables: { b: "online" }, context: { mask: "jedi" } });

  // console.log(helloData);
  // console.log(error?.message);

  useEffect(() => {
    // getter();
  }, []);

  return (
    <>
      <LeftPane handleDrawerClose={handleDrawerClose} drawerOpen={open} />
      <MainPane drawerOpen={open} handleDrawerOpen={handleDrawerOpen}>
        {/* <ChatPane>
          {data.map((v, i) => (
            <Fragment key={i}>
              <ChatMessage message={"Message: " + (i + 1)} mine={i % 2 === 0} date={new Date()} />
            </Fragment>
          ))}
        </ChatPane> */}
        {/* <button onClick={() => getter()}>Get</button> */}

        {/* {helloData?.hello} */}
        {/* <div>{calledData?.helloCalled}</div> */}
      </MainPane>
    </>
  );
}
