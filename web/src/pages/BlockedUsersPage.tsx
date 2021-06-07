import List from "@material-ui/core/List";

import Page from "@web/components/Page";
import UserListItem from "@web/components/UserListItem";
import useBlockedUsers from "@web/hooks/useBlockedUsers";

export default function BlockedUsersPage() {
  const { blockedUsers, unblockUser } = useBlockedUsers();
  const noList = !blockedUsers && <div>You have no blacklist</div>;
  const content = blockedUsers && (
    <List>
      {blockedUsers.map((v: any) => {
        if (!v?._id) return "";
        return (
          <UserListItem
            key={v?._id}
            {...v}
            isOnline={false}
            onClick={() => unblockUser({ userId: v?._id!, name: v?.name })}
          />
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
