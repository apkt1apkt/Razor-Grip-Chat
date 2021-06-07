import { makeStyles } from "@material-ui/core/styles";

import ChatMessage from "@web/components/ChatMessage";
import Page from "@web/components/Page";
import useChatThread from "@web/hooks/useChatThread";

export default function ChatPage() {
  const classes = useStyles();
  const { chatThread } = useChatThread();
  return (
    <Page title="Chat page">
      <div className={classes.chatContainer}>
        <div className={classes.chat}>
          {chatThread.map((v) => (
            <ChatMessage key={v?._id} {...v} />
          ))}
        </div>
      </div>
    </Page>
  );
}

const useStyles = makeStyles(({ palette: { background, type, info } }) => ({
  chatContainer: {
    padding: "15px 30px",
    margin: "0 auto",
    overflowY: "auto",
    backgroundColor: "inherit",
    transform: "rotate(180deg)",
    direction: "rtl",
    height: "calc(100vh - 138px)",
    color: "inherit",
    flex: 1,
    background:
      type === "light"
        ? `linear-gradient(to right,${info.light}, ${info.main}, ${info.light})`
        : `linear-gradient(to right,${background.paper}, ${background.default}, ${background.paper})`,
  },
  chat: {
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
  },
}));
