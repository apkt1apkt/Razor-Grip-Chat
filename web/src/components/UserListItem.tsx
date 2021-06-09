import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@web/components/Avatar";

export default function UserListItem(props: UserListItemProps) {
  const { img, onClick, isOnline, weConnect, dividerAfter, closeGutter } = props;
  const name = props.name || props.email || "...";
  const classes = useStyles();
  if (!props._id) return <></>;
  return (
    <>
      <ListItem onClick={onClick} button={!!onClick as any} className={onClick ? classes.listItemHover : ""}>
        <ListItemAvatar>
          <Avatar alt={name} img={img!} isOnline={!!isOnline && weConnect !== false} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          primaryTypographyProps={{ noWrap: true }}
          className={closeGutter ? classes.closeGutter : ""}
        />
      </ListItem>
      {dividerAfter && <Divider variant="inset" />}
    </>
  );
}

type UserListItemProps = { onClick?: VoidFunction; dividerAfter?: boolean; closeGutter?: boolean } & User;

type User = Data.O<{ img: string; name: string; email: string; _id: string; isOnline: boolean; weConnect: boolean }>;

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
