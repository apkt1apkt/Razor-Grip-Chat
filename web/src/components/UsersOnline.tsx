import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@web/components/Avatar";
import useUsersOnline from "@web/hooks/useUsersOnline";

export default function UsersOnline() {
  const usersOnline = useUsersOnline();
  if (usersOnline.length < 1) return <div>There are no users Online</div>;
  return (
    <List>
      {usersOnline.map((v, i) => {
        const { name, _id, img } = v || {};
        return <OneUserOnline key={_id || i} name={name} img={img} />;
      })}
    </List>
  );
}

function OneUserOnline(props: OneUserOnlineProps) {
  const classes = useStyles();
  const name = props.name || props.email || "...";
  return (
    <ListItem button className={classes.listItem}>
      <ListItemAvatar>
        <Avatar alt={name} img={props.img!} isOnline />
      </ListItemAvatar>
      <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
    </ListItem>
  );
}

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

type OneUserOnlineProps = {
  name?: string | null;
  img?: string | null;
  email?: string | null;
};
