import { useEffect } from "react";
import { gql, useQuery, useReactiveVar } from "@apollo/client";

import { Chat, chatPayload } from "@web/payload";
import { recipientVar } from "@web/reactive";

export default function useChatThread() {
  const recipient = useReactiveVar(recipientVar);
  const { data, subscribeToMore } = useQuery<QueryResult<"chatThread", Chat[]>>(CHAT_THREAD, {
    variables: { recipient },
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
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

  const chatThread = data?.chatThread || [];

  return { chatThread };
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
