import { gql, useQuery } from "@apollo/client";
import { User, userPayload } from "@web/payload";
import { recipientVar } from "@web/reactive";

export default function useRecentChats() {
  const { data, loading } = useQuery<QueryResult<"recentChats", User[]>>(RECENT_CHATS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    returnPartialData: true,
  });

  const recentChats = data?.recentChats || [];

  const onChatClick = (recipientId?: string | null) => () => {
    if (recipientId) recipientVar(recipientId);
  };

  return {
    recentChats: recentChats.length ? recentChats : null,
    onChatClick,
    firstLoad: loading && !data?.recentChats,
    loading: loading,
  };
}

const RECENT_CHATS = gql`
  {
    recentChats {
     ${userPayload}
    }
  }
`;
