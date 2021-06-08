import { useHistory } from "react-router";

import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { recipientVar } from "@web/reactive";

export default function HomeButton(props: HomeButtonProps) {
  const { className } = props;

  const history = useHistory();

  const goHome = () => {
    history.replace("/");
    recipientVar("");
  };

  return (
    <IconButton onClick={goHome} className={className} color="primary">
      <HomeIcon />
    </IconButton>
  );
}

type HomeButtonProps = {
  className?: string;
};
