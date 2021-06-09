import { makeStyles } from "@material-ui/core/styles";

import ChatMessage from "@web/components/ChatMessage";
import Page from "@web/components/Page";
import PageLoading from "@web/components/PageLoading";
import UserListItem from "@web/components/UserListItem";
import useChatThread from "@web/hooks/useChatThread";

export default function ChatPage() {
  const classes = useStyles();
  const { chatThread, recipientData, loading } = useChatThread();
  return (
    <Page
      title={
        <div className={classes.title}>
          <UserListItem {...recipientData} closeGutter />
        </div>
      }
    >
      <PageLoading loading={loading} />
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

const useStyles = makeStyles(({ palette: { background, type, info }, breakpoints }) => ({
  chatContainer: {
    [breakpoints.down("xs")]: {
      height: "calc(100vh - 55px - 56px)",
    },
    padding: "15px 30px",
    margin: "0 auto",
    overflowY: "auto",
    backgroundColor: "inherit",
    transform: "rotate(180deg)",
    direction: "rtl",
    height: "calc(100vh - 55px - 64px)",
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
  title: {
    marginLeft: -15,
  },
}));
