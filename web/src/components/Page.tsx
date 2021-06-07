import React, { useEffect } from "react";

import { appbarTitleVar } from "@web/reactive";

export default function Page(props: PageProps) {
  const { title, children } = props;
  useEffect(() => {
    appbarTitleVar(title);
  }, [title]);
  return <>{children}</>;
}

type PageProps = {
  title: React.ReactNode;
  children: React.ReactNode;
};
