import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";

import { userPayload, User as PartUser } from "@web/payload";

export default function useMe() {
  const { user } = useAuth0();

  const { data, loading, subscribeToMore } = useQuery<QueryResult<"me", User>>(ME);

  const me = data?.me || {};
  const myId = me._id;

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: WE_CONNECT_STATUS_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        const weConnectUsers: User[] = (subscriptionData.data as any)?.weConnectStatusChanged;
        const user = weConnectUsers?.find((v) => v?._id === myId);
        if (!user) return prev;
        return { ...prev, me: user };
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, myId]);

  return {
    _id: user?.sub,
    img: user?.picture,
    email: user?.email,
    fullName: user?.name,
    ...me,
    isLoading: !!loading && data?.me,
  };
}

const payload = `blockedByMe ${userPayload}`;

const ME = gql`
  query Me{
    me{
        ${payload}
    }
  }
`;

const WE_CONNECT_STATUS_CHANGED = gql`
  subscription WeConnectStatusChanged {
    weConnectStatusChanged {
     ${payload}
    }
  }
`;

type User = { blockedByMe: string[] } & PartUser;
