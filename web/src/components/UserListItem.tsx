import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@web/components/Avatar";

export default function UserListItem(props: UserListItemProps) {
  const { img, onClick, dividerAfter, closeGutter, isTyping, lastSeen } = props;
  const name = props.name || props.email || "...";
  const classes = useStyles();
  if (!props._id) return <></>;
  const weConnect = props.weConnect !== false;
  const isOnline = props.isOnline && weConnect;
  const showLastSeen = props.showLastSeen && weConnect;
  return (
    <>
      <ListItem onClick={onClick} button={!!onClick as any} className={onClick ? classes.listItemHover : ""}>
        <ListItemAvatar>
          <Avatar alt={name} img={img!} isOnline={!!isOnline} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ noWrap: true }}
          secondary={
            isTyping
              ? "typing..."
              : showLastSeen && isOnline
              ? "online"
              : showLastSeen && lastSeen
              ? new Date(lastSeen).toLocaleDateString("en-GB", {
                  year: "2-digit",
                  month: "short",
                  day: "numeric",
                  hour12: false,
                  hour: "numeric",
                  minute: "numeric",
                })
              : undefined
          }
          secondaryTypographyProps={{ noWrap: true }}
          className={closeGutter ? classes.closeGutter : ""}
        />
      </ListItem>
      {dividerAfter && <Divider variant="inset" />}
    </>
  );
}

type UserListItemProps = {
  onClick?: VoidFunction;
  dividerAfter?: boolean;
  closeGutter?: boolean;
  showLastSeen?: boolean;
} & User;

type User = Data.O<{
  img: string;
  name: string;
  email: string;
  _id: string;
  isOnline: boolean;
  weConnect: boolean;
  lastSeen: Date;
  isTyping?: boolean;
}>;

const useStyles = makeStyles(({ spacing, transitions, breakpoints }) => ({
  listItemHover: {
    "&:hover": {
      "& .MuiAvatar-root": {
        width: spacing(6),
        height: spacing(6),
        transition: transitions.create(["width", "height"]),
      },
    },
  },
  closeGutter: {
    [breakpoints.down("xs")]: {
      marginLeft: -20,
    },
  },
}));
