import { useEffect } from "react";

import { appbarTitleVar } from "@web/reactive";

export default function useSetAppbarTitle(title: React.ReactNode) {
  useEffect(() => {
    appbarTitleVar(title);
  }, [title]);
}
