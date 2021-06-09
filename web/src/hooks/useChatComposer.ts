import { useState } from "react";
import { gql, useMutation, useReactiveVar, useQuery } from "@apollo/client";

import { recipientVar } from "@web/reactive";
import { chatPayload } from "@web/payload";
import { getUniqueId } from "@web/helpers/simple";
import { CHAT_THREAD } from "@web/hooks/useChatThread";

export default function useChatComposer() {
  const [message, setMessage] = useState("");

  const recipient = useReactiveVar(recipientVar);

  const { data } = useQuery(USER, { variables: { userId: recipient } });

  const [doSendMessage] = useMutation(SEND_MESSAGE);

  const onTypeMessage = (e: any) => setMessage(e.target.value);

  const onSendMessage = (e: any) => {
    e.preventDefault();
    const msg = typeof message === "string" ? message.trim() : message;
    if (msg) {
      doSendMessage({
        variables: { message: msg, recipient },
        optimisticResponse: {
          sendMessage: {
            _id: getUniqueId(),
            message: msg,
            recipient,
            createdAt: new Date(),
            isMine: true,
            _isOptimistic: true,
            __typename: "Chat",
          },
        },
        update: (cache, { data: { sendMessage } }) => {
          const variables = { recipient };
          const __chatThread = (cache.readQuery({ query: CHAT_THREAD, variables }) as any)?.chatThread || [];
          const chatThread = sendMessage._isOptimistic
            ? __chatThread
            : __chatThread.filter((v: any) => v?._id !== sendMessage._id);
          const newChatThread = [...chatThread, sendMessage];

          cache.writeQuery({
            query: CHAT_THREAD,
            variables,
            data: { chatThread: newChatThread },
          });
        },
      }).catch((e) => e);
    }
    setMessage("");
  };

  return { message, recipient, onTypeMessage, onSendMessage, weConnect: !!data?.user?.weConnect };
}

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!, $recipient: String!) {
    sendMessage(message: $message, recipient: $recipient) {
     ${chatPayload}
    }
  }
`;

const USER = gql`
  query User($userId: String!) {
    user(userId: $userId) {
      _id
      weConnect
    }
  }
`;
