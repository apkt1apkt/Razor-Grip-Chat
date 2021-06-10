import { useEffect, useState } from "react";
import { gql, useMutation, useReactiveVar, useQuery, useSubscription } from "@apollo/client";

import { recipientVar } from "@web/reactive";
import { chatPayload } from "@web/payload";
import { getUniqueId } from "@web/helpers/simple";
import { CHAT_THREAD } from "@web/hooks/useChatThread";

export default function useChatComposer() {
  const recipient = useReactiveVar(recipientVar);

  const [message, setMessage] = useState(messageRecipientCache[recipient!] || "");
  const [isTyping, setTyping] = useState(false);

  const { data } = useQuery(USER, { variables: { userId: recipient } });

  const [doSendMessage] = useMutation(SEND_MESSAGE);

  const [doAmTyping] = useMutation(AM_TYPING);

  useSubscription(USER_IS_TYPING, { variables: { userId: recipient }, skip: !recipient });

  const onSetMessage = (message: string) => {
    setTyping(true);
    setMessage(message);
  };

  const onTypeMessage = (e: any) => onSetMessage(e.target.value);

  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setTyping(false);
    }, 500);
    return () => {
      clearTimeout(typingTimeout);
    };
  }, [message]);

  useEffect(() => {
    doAmTyping({ variables: { isTyping, recipient }, fetchPolicy: "no-cache" }).catch((e) => e);
  }, [isTyping, doAmTyping, recipient]);

  useEffect(() => {
    return () => {
      messageRecipientCache[recipient!] = message;
    };
  }, [message, recipient]);

  useEffect(() => {
    setMessage(messageRecipientCache[recipient!] || "");
  }, [recipient]);

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

  return {
    message,
    recipient,
    onTypeMessage,
    onSendMessage,
    weConnect: !!data?.user?.weConnect,
    setMessage: onSetMessage,
  };
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
      isTyping
      lastSeen
    }
  }
`;

const USER_IS_TYPING = gql`
  subscription UserIsTyping($userId: String!) {
    userIsTyping(userId: $userId) {
      _id
      isTyping
    }
  }
`;

const AM_TYPING = gql`
  mutation AmTyping($isTyping: Boolean!, $recipient: String!) {
    amTyping(isTyping: $isTyping, recipient: $recipient)
  }
`;

const messageRecipientCache: Obj = {};
