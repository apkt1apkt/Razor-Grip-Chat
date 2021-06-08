import { Fragment } from "react";

import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";

import NoneFound from "@web/components/NoneFound";
import Page from "@web/components/Page";
import UserListItem from "@web/components/UserListItem";
import useBlockedUsers from "@web/hooks/useBlockedUsers";

export default function BlockedUsersPage() {
  const { blockedUsers, unblockUser } = useBlockedUsers();

  const noList = !blockedUsers && (
    <div style={{ display: "grid", placeItems: "center", marginTop: "15vh" }}>
      <NoneFound message="You have no blocked users" />
    </div>
  );

  const content = blockedUsers && (
    <List>
      {blockedUsers.map((v: any) => {
        if (!v?._id) return "";
        return (
          <Fragment key={v._id}>
            <UserListItem {...v} isOnline={false} onClick={() => unblockUser({ userId: v?._id!, name: v?.name })} />
            <Divider variant="inset" />
          </Fragment>
        );
      })}
    </List>
  );

  return (
    <Page title="Blocked Users">
      {noList}
      {content}
    </Page>
  );
}
