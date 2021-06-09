import { useQuery, gql, useApolloClient } from "@apollo/client";
import { useEffect } from "react";

import { userPayload, User } from "@web/payload";
import useMe from "@web/hooks/useMe";

export default function useUsersOnline() {
  const { _id: myId } = useMe();
  const { data, subscribeToMore } = useQuery<UsersOnline>(USERS_ONLINE);
  const client = useApolloClient();

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: USER_ONLINE_STATUS_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        const user: User = (subscriptionData.data as any)?.userOnlineStatusChanged;
        if (user?._id === myId) {
          client.mutate({ mutation: AM_ONLINE }).catch((e) => e);
          return prev;
        }
        return modifyUsersOnlineCache(user, prev);
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, myId, client]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: WE_CONNECT_STATUS_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        const weConnectUsers: User[] = (subscriptionData.data as any)?.weConnectStatusChanged;
        const user = weConnectUsers?.find((v) => v?._id !== myId);
        return modifyUsersOnlineCache(user, prev);
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, myId]);

  return data?.usersOnline || [];
}

const modifyUsersOnlineCache = (user: Nullable<User>, prev: UsersOnline) => {
  if (!user) return prev;
  const usersOnline = prev?.usersOnline || [];
  const modifiedUsersOnline = usersOnline.filter((v) => v?._id !== user._id);
  if (user.isOnline && user.weConnect) return { ...prev, usersOnline: [user, ...modifiedUsersOnline] };
  return { ...prev, usersOnline: modifiedUsersOnline };
};

const USERS_ONLINE = gql`
  {
    usersOnline {
     ${userPayload}
    }
  }
`;

const USER_ONLINE_STATUS_CHANGED = gql`
  subscription UserOnlineStatusChanged {
    userOnlineStatusChanged {
     ${userPayload}
    }
  }
`;

const WE_CONNECT_STATUS_CHANGED = gql`
  subscription WeConnectStatusChanged {
    weConnectStatusChanged {
     ${userPayload}
    }
  }
`;

const AM_ONLINE = gql`
  mutation AmOnline{
    amOnline{
      ${userPayload}
    }
  }
`;

type UsersOnline = QueryResult<"usersOnline", User[]>;
