import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

export default function useUsersOnline() {
  const { data, subscribeToMore } = useQuery<{ usersOnline: UsersOnline }>(USERS_ONLINE);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: USER_ONLINE_STATUS_CHANGED,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const user: User = (subscriptionData.data as any)?.userOnlineStatusChanged;
        if (user) {
          const usersOnline = prev.usersOnline || [];
          const modifiedUsersOnline = usersOnline.filter((v) => v?._id !== user._id);
          if (user.isOnline)
            return {
              ...prev,
              usersOnline: [user, ...modifiedUsersOnline],
            };
          return { ...prev, usersOnline: modifiedUsersOnline };
        }
        return prev;
      },
    });
    return () => {
      unsubscribe();
    };
  });

  return data?.usersOnline || [];
}

const userPayload = "_id name img email isOnline lastSeen";

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

type User = { _id: string; name: string; img: string; isOnline: boolean; lastSeen: boolean; email: string };

type UsersOnline = Data.O<User[]>;
