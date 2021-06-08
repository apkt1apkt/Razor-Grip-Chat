import { useEffect } from "react";
import { gql, useApolloClient, useQuery } from "@apollo/client";

import useBlockUser from "@web/hooks/useBlockUser";

export default function useBlockedUsers() {
  const { data, subscribeToMore, loading } = useQuery<QueryResult<"myBlacklist", Users>>(MY_BLACKLIST, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const { onUnblockUser } = useBlockUser();
  const client = useApolloClient();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: WE_CONNECT_STATUS_CHANGED,
      updateQuery: (prev) => {
        client.query({ query: MY_BLACKLIST, fetchPolicy: "network-only" }).catch((e) => e);
        return prev;
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, client]);

  const blacklist = data?.myBlacklist || [];

  return {
    blockedUsers: blacklist.length ? blacklist : null,
    onUnblockUser,
    firstLoad: loading && !data?.myBlacklist,
    loading,
  };
}

const MY_BLACKLIST = gql`
  {
    myBlacklist {
      _id
      name
      img
    }
  }
`;

const WE_CONNECT_STATUS_CHANGED = gql`
  subscription WeConnectStatusChanged {
    weConnectStatusChanged {
      _id
      blockedByMe
    }
  }
`;

type Users = Data.O<{ _id: string; name: string; img: string }[]>;
