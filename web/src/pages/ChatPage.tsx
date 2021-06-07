import { makeStyles } from "@material-ui/core/styles";

import ChatMessage from "@web/components/ChatMessage";
import Page from "@web/components/Page";
import UserListItem from "@web/components/UserListItem";
import useChatThread from "@web/hooks/useChatThread";

export default function ChatPage() {
  const classes = useStyles();
  const { chatThread, recipientData } = useChatThread();
  return (
    <Page
      title={
        <div className={classes.title}>
          <UserListItem {...recipientData} />
        </div>
      }
    >
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
  title: {
    marginLeft: -25,
    [breakpoints.down("xs")]: {
      marginLeft: -15,
    },
  },
}));
