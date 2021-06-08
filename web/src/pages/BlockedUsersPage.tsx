import List from "@material-ui/core/List";

import NoneFound from "@web/components/NoneFound";
import Page from "@web/components/Page";
import PageLoading from "@web/components/PageLoading";
import UserListItem from "@web/components/UserListItem";
import useBlockedUsers from "@web/hooks/useBlockedUsers";

export default function BlockedUsersPage() {
  const { blockedUsers, onUnblockUser, loading, firstLoad } = useBlockedUsers();

  const noList = !blockedUsers && !firstLoad && <NoneFound message="You have no blocked users" />;

  const content = blockedUsers && !firstLoad && (
    <List>
      {blockedUsers.map((v: any) => (
        <UserListItem
          key={v?._id}
          {...v}
          isOnline={false}
          onClick={onUnblockUser({ userId: v?._id!, name: v?.name })}
          dividerAfter
        />
      ))}
    </List>
  );

  return (
    <Page title="Blocked Users">
      <PageLoading loading={loading} firstLoad={firstLoad} />
      {noList}
      {content}
    </Page>
  );
}
