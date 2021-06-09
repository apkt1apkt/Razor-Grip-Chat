import { useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import ChatMessage from "@web/components/ChatMessage";
import Page from "@web/components/Page";
import PageLoading from "@web/components/PageLoading";
import UserListItem from "@web/components/UserListItem";
import useChatThread from "@web/hooks/useChatThread";
import { bottomPaneHeight } from "@web/fixed";

export default function ChatPage() {
  const classes = useStyles();
  const { chatThread, recipientData, loading } = useChatThread();

  useLayoutEffect(() => {
    document.getElementById(chatThread?.[chatThread.length - 1]?._id!)?.scrollIntoView();
  });

  return (
    <Page
      title={
        <div className={classes.title}>
          <UserListItem {...recipientData} closeGutter />
        </div>
      }
    >
      <div className={classes.container}>
        <PageLoading loading={loading} />

        <div className={classes.chatContainer}>
          <div className={classes.chat}>
            {chatThread.map((v) => (
              <div id={v?._id!} key={v?._id}>
                <ChatMessage {...v} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

const useStyles = makeStyles(({ palette: { background, type, info }, breakpoints }) => ({
  container: {
    paddingBottom: 45,
  },
  chatContainer: {
    flex: 1,
    [breakpoints.down("xs")]: {
      minHeight: `calc(100vh  - 56px - ${bottomPaneHeight}px)`,
    },
    minHeight: `calc(100vh  - 64px - ${bottomPaneHeight}px)`,
    background:
      type === "light"
        ? `linear-gradient(to right,${info.light}, ${info.main}, ${info.light})`
        : `linear-gradient(to right,${background.paper}, ${background.default}, ${background.paper})`,
  },
  chat: {
    padding: 15,
  },
  title: {
    marginLeft: -15,
  },
}));
