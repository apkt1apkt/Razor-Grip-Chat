import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import NoneFound from "@web/components/NoneFound";
import Page from "@web/components/Page";
import PageLoading from "@web/components/PageLoading";
import UserListItem from "@web/components/UserListItem";
import useRecentChats from "@web/hooks/useRecentChats";

export default function RecentChatsPage() {
  const classes = useStyles();

  const { recentChats, onChatClick, loading, firstLoad } = useRecentChats();

  const noList = !recentChats && !firstLoad && <NoneFound message="You have no conversations." />;

  const content = recentChats && !firstLoad && (
    <List className={classes.list}>
      {recentChats.map((v) => (
        <UserListItem key={v?._id} {...v} onClick={onChatClick(v?._id)} dividerAfter />
      ))}
    </List>
  );

  return (
    <Page title="Recent Chats">
      <PageLoading loading={loading} firstLoad={firstLoad} />
      {noList}
      {content}
    </Page>
  );
}

const useStyles = makeStyles(({ breakpoints }) => ({
  list: {
    [breakpoints.down("xs")]: {
      paddingLeft: 10,
    },
  },
}));
