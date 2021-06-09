import { useHistory } from "react-router";

import { recipientVar } from "@web/reactive";

export default function useHome() {
  const history = useHistory();

  const goHome = () => {
    history.replace("/");
    recipientVar("");
  };
  return { goHome };
}
