import Badge from "@material-ui/core/Badge";
import Image from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";

export default function Avatar(props: AvatarProps) {
  const { isOnline, img, alt } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        classes={{ badge: isOnline ? classes.badge : undefined }}
        variant="dot"
      >
        <Image alt={alt} src={img}>
          {alt[0].toUpperCase()}
        </Image>
      </Badge>
    </div>
  );
}

type AvatarProps = {
  isOnline?: boolean;
  img?: string;
  alt: string;
};

const useStyles = makeStyles(({ palette: { background }, breakpoints, spacing, transitions }) => ({
  root: {
    [breakpoints.down("xs")]: {
      marginLeft: -10,
    },
  },
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s 10 ease-in-out ",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
