import { Fragment } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import List from "@material-ui/core/List";

import NoneFound from "@web/components/NoneFound";
import Page from "@web/components/Page";
import UserListItem from "@web/components/UserListItem";
import useRecentChats from "@web/hooks/useRecentChats";

export default function RecentChatsPage() {
  const { recentChats, onChatClick, loading, firstLoad } = useRecentChats();

  const noList = !recentChats && !firstLoad && (
    <div style={{ display: "grid", placeItems: "center", marginTop: "15vh" }}>
      <NoneFound message="You have no conversations." />
    </div>
  );

  const content = recentChats && !firstLoad && (
    <List>
      {recentChats.map((v) => {
        if (!v?._id) return "";
        return (
          <Fragment key={v._id}>
            <UserListItem {...v} onClick={onChatClick(v._id)} />
            <Divider variant="inset" />
          </Fragment>
        );
      })}
    </List>
  );

  return (
    <Page title="Recent Chats">
      {loading && !firstLoad && <LinearProgress />}
      {firstLoad && (
        <div style={{ display: "grid", placeItems: "center", marginTop: "25vh" }}>
          <CircularProgress />
        </div>
      )}
      {noList}
      {content}
    </Page>
  );
}
