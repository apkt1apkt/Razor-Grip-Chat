import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";

import useHome from "@web/hooks/useHome";

export default function HomeButton(props: HomeButtonProps) {
  const { className } = props;
  const { goHome } = useHome();

  return (
    <IconButton onClick={goHome} className={className} color="primary">
      <HomeIcon />
    </IconButton>
  );
}

type HomeButtonProps = {
  className?: string;
};
