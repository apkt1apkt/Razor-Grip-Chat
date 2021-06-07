import { useQuery, gql } from "@apollo/client";

import Page from "@web/components/Page";

export default function RecentChatsPage() {
  const { data } = useQuery(RECENT_CHATS);
  console.log(data);
  return (
    <Page title="Recent Chats">
      <div>This is the recentPage</div>
    </Page>
  );
}

const RECENT_CHATS = gql`
  {
    recentChats {
      _id
      name
      email
      isOnline
      lastSeen
    }
  }
`;
