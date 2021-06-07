import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";

import { Chat, chatPayload, userPayload, User } from "@web/payload";
import { recipientVar } from "@web/reactive";

export default function useChatThread() {
  const recipient = useReactiveVar(recipientVar);
  const { data, subscribeToMore } = useQuery<QueryResult<"chatThread", Chat[]>>(CHAT_THREAD, {
    variables: { recipient },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !recipient,
  });

  const { data: userData } = useQuery<QueryResult<"user", User>>(USER, {
    variables: { userId: recipient },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
    skip: !recipient,
    returnPartialData: true,
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: INCOMING_MESSAGE,
      variables: { sender: recipient },
      updateQuery: (prev, { subscriptionData }) => {
        const chat = (subscriptionData?.data as any)?.incomingMessage;
        if (!chat) return prev;
        const prevChatThread = (prev.chatThread || []).filter((v) => v?._id !== chat?._id);
        return { ...prev, chatThread: [...prevChatThread, chat] };
      },
    });
    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, recipient]);

  return { chatThread: data?.chatThread || [], recipientData: userData?.user || {} };
}

export const CHAT_THREAD = gql`
  query ChatThread($recipient:String!){
    chatThread(recipient:$recipient){
      ${chatPayload}
    }
  }
`;

const INCOMING_MESSAGE = gql`
  subscription IncomingMessage($sender:String!){
    incomingMessage(sender:$sender){
      ${chatPayload}
    }
  }
`;

const USER = gql`
  query User($userId: String!) {
    user(userId: $userId) {
        ${userPayload}
    }
  }
`;
