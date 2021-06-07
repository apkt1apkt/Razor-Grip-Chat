import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@web/components/Avatar";

export default function UserListItem(props: UserListItemProps) {
  const { img, onClick, isOnline } = props;
  const name = props.name || props.email || "...";
  const classes = useStyles();
  return (
    <ListItem onClick={onClick} button={!!onClick as any} className={classes.listItem}>
      <ListItemAvatar>
        <Avatar alt={name} img={img!} isOnline={!!isOnline} />
      </ListItemAvatar>
      <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
    </ListItem>
  );
}

type UserListItemProps = { onClick?: VoidFunction } & User;

type User = Data.O<{ img: string; name: string; email: string; _id: string; isOnline: boolean }>;

const useStyles = makeStyles(({ spacing, transitions }) => ({
  listItem: {
    "&:hover": {
      "& .MuiAvatar-root": {
        width: spacing(6),
        height: spacing(6),
        transition: transitions.create(["width", "height"]),
      },
    },
  },
}));
