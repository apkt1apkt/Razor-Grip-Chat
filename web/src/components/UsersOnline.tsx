import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@web/components/Avatar";
import useUsersOnline from "@web/hooks/useUsersOnline";

export default function UsersOnline() {
  const usersOnline = useUsersOnline();
  return (
    <List>
      {usersOnline.map((v) => (
        <OneUserOnline key={v._id} name={v.name} img={v.img} />
      ))}
    </List>
  );
}

function OneUserOnline(props: OneUserOnlineProps) {
  const { name, img } = props;
  const classes = useStyles();
  return (
    <ListItem button className={classes.listItem}>
      <ListItemAvatar>
        <Avatar alt={name} img={img} isOnline />
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
  name: string;
  img?: string;
};
